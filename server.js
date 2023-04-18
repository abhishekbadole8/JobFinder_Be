const express = require("express");
const app = express();
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

const dotenv = require("dotenv").config();
const port = process.env.PORT || 8001;

connectDb();
app.use(express.json());

app.use("/users", require("./routes/userRoutes"));
app.use(errorHandler);


app.listen(port, () => {
  console.log(`Connected to PORT : ${port}`);
});
