

async function createRestaurant(req, res) {
  const { name, phone, image, status, closing_time, opening_time } = req.body;
  const db = req.app.locals.db;

  if (!name || !phone) {
      return res.status(400).json({ error: 'Name and Phone are required.' });
  }

  try {
      const query = `
          INSERT INTO restaurants (name, phone, image, status, closing_time, opening_time) 
          VALUES (?, ?, ?, ?, ?, ?)
      `;
      
      const [result] = await db.query(query, [
          name, 
          phone, 
          image || '', 
          status || 'open',
          closing_time || null,
          opening_time || null
      ]);
      
      res.status(201).json({ 
          message: 'Restaurant created successfully', 
          restaurantId: result.insertId 
      });

  } catch (error) {
      console.error('Error creating restaurant:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getAllRestaurants(req, res) {
  const db = req.app.locals.db;
  try {
      const [rows] = await db.query('SELECT * FROM restaurants');
      res.json(rows);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
}

module.exports = { createRestaurant, getAllRestaurants };