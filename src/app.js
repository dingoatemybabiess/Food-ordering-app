require("dotenv").config();
const express = require("express");
const cors = require('cors');
const authRoutes = require("./routes/authRoutes");
const initializeDatabase = require('./config/db');
const userRoutes = require('./routes/user.routes');
const restaurantRoutes = require('./routes/restaurant.routes');
const orderRoutes = require('./routes/order.routes');

const app = express();
app.use(cors());
app.use(express.json());

// Mount auth routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        const db = await initializeDatabase();
        app.locals.db = db;
        console.log("Database connected and attached.");

        app.use('/users', userRoutes);
        app.use('/restaurants', restaurantRoutes);
        app.use('/orders', orderRoutes);

        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
}

startServer();
