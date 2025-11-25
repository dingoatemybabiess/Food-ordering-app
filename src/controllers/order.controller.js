const db = require('../config/db');

async function createOrder(req, res) {
    const connection = await db.getConnection(); 

    try {

        await connection.beginTransaction();


        const { userId, items: orderedItems } = req.body;


        let totalOrderPrice = 0;
        const processedItems = [];

        for (const item of orderedItems) {
            // Fetch the real item details (especially price) from your 'items' table
            const [itemRows] = await connection.query(
                'SELECT item_id, name, price FROM items WHERE item_id = ?',
                [item.itemId]
            );

            if (itemRows.length === 0) {
                
                throw new Error(`Item with ID ${item.itemId} not found.`);
            }

            const dbItem = itemRows[0];
            const itemPrice = parseFloat(dbItem.price); // Ensure it's a number
            
            if (item.quantity <= 0) {
                throw new Error(`Quantity for item ${item.itemId} must be positive.`);
            }

            // Calculate the cost for this specific item in the order
            const itemTotal = itemPrice * item.quantity;
            totalOrderPrice += itemTotal; // Add to the grand total

            processedItems.push({
                itemId: dbItem.item_id,
                quantity: item.quantity,
                priceAtTimeOfOrder: itemPrice 
            });
        }

        const [orderInsertResult] = await connection.query(
            'INSERT INTO orders (user_id, total_amount, order_status, order_date) VALUES (?, ?, ?, NOW())',
            [userId, totalOrderPrice, 'pending'] // 'pending' or 'placed' as initial status
        );

        const newOrderId = orderInsertResult.insertId;

        for (const item of processedItems) {
            await connection.query(
                'INSERT INTO order_details (order_id, item_id, quantity, price_at_order) VALUES (?, ?, ?, ?)',
                [newOrderId, item.itemId, item.quantity, item.priceAtTimeOfOrder]
            );
        }
        await connection.commit();

        res.status(201).json({
            message: "Order placed successfully!",
            orderId: newOrderId,
            totalAmount: totalOrderPrice
        });

    } catch (error) {
        await connection.rollback();
        console.error('Error placing order:', error);
        res.status(500).json({ error: error.message || 'Failed to place order.' });

    } finally { 
        connection.release();
    }
}

module.exports = { createOrder };
