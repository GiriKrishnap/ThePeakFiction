const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING, {
  socketTimeoutMS: 30000, // Increase the timeout value to 30 seconds
  // Other options...
})
        console.log("mongodb connected successfully");
    } catch (error) {
        console.log('error on mongoDb connection', error)
    }
}

module.exports = dbConnect;
