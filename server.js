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

// Mount Routes
app.use("/api/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/restaurants", restaurantRoutes);
app.use("/orders", orderRoutes);

async function startServer() {
  try {
    const db = await initializeDatabase();
    app.locals.db = db;
    console.log("Database connected and attached.");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
