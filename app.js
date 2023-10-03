const express = require("express");
const session = require('express-session');
require('dotenv').config();

// Routes
const authRoute = require('./routes/authRoutes');

// Express
const app = express();

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
}));

// Routes
app.use("/auth", authRoute);

// Server
app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});

