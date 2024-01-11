const { default: mongoose } = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("mongodb connected successfully");
    } catch (error) {
        console.log('error on mongoDb connection', error)
    }
}

module.exports = dbConnect;