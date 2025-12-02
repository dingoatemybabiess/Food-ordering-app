
async function getItemRatings(req, res) {
    const db = req.app.locals.db;
    try {
        const [rows] = await db.query(`
            SELECT item_id, AVG(rating) AS avg_rating, COUNT(*) AS review_count
            FROM reviews
            GROUP BY item_id
            ORDER BY avg_rating DESC
        `);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getItemRatings };
