const express = require("express");
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();

const authRoute = require('./routes/authRoutes');
const missionRoute = require('./routes/missionRoutes');
const orgRoutes = require('./routes/orgRoutes');

const app = express();

app.use(express.json());

const corsOptions ={
  origin:'http://localhost:5173', 
  credentials:true,
  optionSuccessStatus:200
}

app.use(cors(corsOptions));


app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.use("/auth", authRoute);
app.use("/mission", missionRoute);
app.use("/organisation", orgRoutes);

// Server
app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});

