const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = (await mongoose.connect(process.env.MONGOOSE_CONNECTION))
    console.log("Database Is Successfully Connected");
  } catch (error) {
    console.log(`Database Connection Error`, { message: error.message });
  }
};

module.exports = connectDb;
