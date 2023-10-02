const express = require("express");

// Routes
const authRoute = require('./routes/authRoutes');

// Express
const app = express();

// Routes
app.use("/auth", authRoute);

// Server
app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});

