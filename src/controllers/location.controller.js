async function addLocation(req, res) {
  const db = req.app.locals.db;

  try {
      const userId = req.user.id; 

      const { 
          street, 
          building, 
          apartment, 
          city, 
          floor 
      } = req.body;

      if (!street || !city) {
          return res.status(400).json({ error: "Street and city are required fields." });
      }

      const [result] = await db.query(
          `INSERT INTO customer_location 
          (user_id, street, building, apartment, city, floor) 
          VALUES (?, ?, ?, ?, ?, ?)`,
          [userId, street, building || null, apartment || null, city, floor || null]
      );

      res.status(201).json({
          message: "Location added successfully.",
          locationId: result.insertId,
          userId: userId
      });

  } catch (error) {
      console.error('Error adding location:', error);
      res.status(500).json({ error: error.message || 'Failed to add location.' });
  }
}

module.exports = { addLocation };