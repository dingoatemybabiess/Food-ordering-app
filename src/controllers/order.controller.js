async function getOrderHistory(req, res){
    try {
        const userId = req.user.user_id;
        const db = req.app.locals.db;

        const [orders] = await db.query(
            `SELECT * FROM orders WHERE user_id = ? ORDER BY order_date DESC`,
            [userId]
        );

        res.json(orders);
    } catch (error) {
        console.error("Order history error:", error);
        res.status(500).json({ error: "Error retrieving order history" });
    }
};
async function createOrder(req, res) {
    const db = req.app.locals.db;
    const connection = await db.getConnection(); 

    try {

        await connection.beginTransaction();


        const { userId, locationId: bodyLocationId, items: orderedItems } = req.body;

        let locationId = bodyLocationId;

        if (!locationId) {
            const [locations] = await connection.query(
                'SELECT location_id FROM customer_location WHERE user_id = ? ORDER BY location_id LIMIT 1',
                [userId]
            );

            if (locations.length === 0) {
                throw new Error('No location found for this user');
            }

            locationId = locations[0].location_id;
        }


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
            'INSERT INTO orders (user_id, location_id, total_amount, status, order_date) VALUES (?, ?, ?, ?, NOW())',
            [userId, locationId, totalOrderPrice, 'Preparing']
        );

        const newOrderId = orderInsertResult.insertId;

        for (const item of processedItems) {
            await connection.query(
                'INSERT INTO order_details (order_id, item_id, quantity, price) VALUES (?, ?, ?, ?)',
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

module.exports = { createOrder,getOrderHistory };
