const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Database connection succeded!");
  } catch (error) {
    console.log(`Database connection failed with error ${error.message} `);
  }
};

module.exports = dbConnect;
