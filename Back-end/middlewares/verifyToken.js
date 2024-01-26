const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config()
///---------------------------


const protect = asyncHandler(async (req, res, next) => {



    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {

        try {

            const token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            next();

        } catch (error) {

            res.status(401).json("Invalid token")
        }
    } else {

        console.log('THERE IS NO TOKEN IS HERE>>>>>>>');
        res.status(401).json("Token not found")

    }
})

module.exports = { protect }