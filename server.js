const express = require("express");
const app = express();
var cors = require("cors");
const connectDb = require("./config/dbConnection");
require("dotenv").config();
const errorHandler = require("./middleware/errorHandler");
const port = process.env.PORT || 8001;

connectDb();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/job", require("./routes/newJobRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Connected to PORT : ${port}`);
});
