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
            console.log(userEmail);
            const emailExist = await ReaderModel.findOne({ email: userEmail });
            if (emailExist) {
                res.json({ status: false, message: 'You Are Already A Member' });
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
    /////////////////////////
    readerLogin: async (req, res) => {
        try {
            const emailExist = await ReaderModel.findOne({ email: req.body.email });
            if (!emailExist) {
                res.json({ status: false, message: 'Email Not Found' })
            } else {
                const checkPassword = await bcrypt.compare(req.body.password, emailExist.password);
                if (!checkPassword) {
                    res.json({ status: false, message: "Wrong Password" })
                } else {
                    const token = jwt.sign({
                        userName: emailExist.userName,
                        email: emailExist.email,
                        id: emailExist._id
                    }, "secret123", { expiresIn: '7d' });
                    res.json({ status: true, message: 'Your Login is Success', token });
                }
            }
        } catch (error) {
            res.json({ status: false, message: "oops catch error" });
            console.log(error + 'error in reader signup');
        }
    },

}