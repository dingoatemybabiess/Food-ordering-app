
async function getDailySales(req, res) {
    const db = req.app.locals.db;
    try {
        const [rows] = await db.query(`
            SELECT DATE(order_date) AS day, SUM(total_amount) AS total_sales, COUNT(id) AS orders_count
            FROM orders
            GROUP BY DATE(order_date)
            ORDER BY day DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getMonthlySales(req, res) {
    const db = req.app.locals.db;
    try {
        const [rows] = await db.query(`
            SELECT DATE_FORMAT(order_date, '%Y-%m') AS month, SUM(total_amount) AS total_sales, COUNT(id) AS orders_count
            FROM orders
            GROUP BY month
            ORDER BY month DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getDailySales, getMonthlySales };
