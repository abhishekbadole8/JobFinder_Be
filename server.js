const express = require("express");
const connectDb = require("./config/dbConnection");
const app = express();

const dotenv = require("dotenv").config();
const port = process.env.PORT ;

connectDb()
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

app.listen(port, () => {
  console.log(`Connected to PORT : ${port}`);
});
