require("dotenv").config();
const express = require("express");
const cors = require("cors");
const initializeDatabase = require("./src/database/db");

// Import Routes
const authRoutes = require("./src/routes/auth.routes");
const userRoutes = require("./src/routes/user.routes");
const restaurantRoutes = require("./src/routes/restaurant.routes");
const orderRoutes = require("./src/routes/order.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

async function startServer() {
  try {

      const db = await initializeDatabase();
      
      app.locals.db = db;
      console.log("Database connected and attached.");

      app.use("/api/auth", authRoutes);

      app.use('/users', userRoutes);
      
      app.use('/restaurants', restaurantRoutes);

      app.use('/orders', orderRoutes);

      // 4. Test Route
      app.get('/', (req, res) => {
          res.send('Food Service API is running');
      });

      // 5. Start Server
      app.listen(PORT, () => {
          console.log(`Server running on http://localhost:${PORT}`);
      });

  } catch (err) {
      console.error('Failed to start server:', err.message);
      process.exit(1);
  }
}

startServer();
