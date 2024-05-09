const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
  try {
    const connectionString = process.env.CONNECTION_STRING

    await mongoose.connect(connectionString, {
      socketTimeoutMS: 30000, // Increase the timeout value to 30 seconds
      // Other options...
    });

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error on MongoDB connection", error);
  }
};

module.exports = dbConnect;
