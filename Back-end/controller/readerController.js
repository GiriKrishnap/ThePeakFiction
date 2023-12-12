const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcrypt');

const ReaderModel = require('../model/readerModel');
const AuthorModel = require('../model/authorModel');
const NovelModel = require('../model/novelModel');

module.exports = {

    readerSignup: async (req, res) => {
        try {
            let userEmail = req.body.email
            const exist = await ReaderModel.findOne({ email: userEmail });
            if (exist) {
                res.json({ status: false, message: 'you are Already a Member' });
            } else {
                const securePassword = await bcrypt.hash(req.body.password, 10);
                const userCreate = ReaderModel.create({
                    userName: req.body.userName,
                    email: userEmail,
                    phone: req.body.phone,
                    password: securePassword
                })

                res.json({ status: true, message: 'Your Signup is Success ' });
            }
        } catch (error) {
            res.json({ status: false, message: "oops catch error" });
            console.log(error + 'error in reader signup');
        }
    },

}