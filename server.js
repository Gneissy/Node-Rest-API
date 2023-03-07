// Dependancies
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');

// Database connection
mongoose.connect(process.env.DB_URL, {useNewUrlParser : true });
mongoose.connection.on("error", (error)=> console.log(error));
mongoose.connection.once("open", ()=> console.log("Connected to the database."));

// Using express.json, it parses incoming JSON requests and puts the parsed data in req.body.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// this means like localhost:3000/players and continued url's are goes into this router
const playersRouter = require("./routes/players");
app.use("/players", playersRouter);

// Server on
app.listen(3000, () => {console.log("Server is ready.")});
