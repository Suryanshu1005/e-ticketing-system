const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const authRoutes = require("./routes/v1/auth");
const eventRoutes = require("./routes/v1/event");
const ticketRoutes = require("./routes/v1/tickets");
const errorHandler = require("./utils/errorHandler");

const app = express();

// Middleware
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/v1/auth", authRoutes);
app.use("/v1/events", eventRoutes);
app.use("/v1/tickets", ticketRoutes);

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync();
    console.log("Database synchronized");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Unable to connect to the database:", err);
  }
})();
