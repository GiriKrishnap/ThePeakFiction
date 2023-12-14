const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const ReaderModel = require('../model/readerModel');
const AuthorModel = require('../model/authorModel');
const NovelModel = require('../model/novelModel');
require('dotenv/config');
module.exports = {

    adminLogin: async (req, res) => {
        try {
            let email = process.env.ADMIN_EMAIL
            let password = process.env.ADMIN_PASSWORD
            if (req.body.email !== email || req.body.password !== password) {
                res.json({ status: false, message: 'email or password is wrong!' });
            } else {
                const adminToken = jwt.sign({
                    email: email,
                }, 'secret123', { expiresIn: '7d' });

                res.json({ status: true, message: 'the login is completed', adminToken });
            }

        } catch (error) {
            res.json({ status: false, message: 'admin catch error server side :: adminLogin' });
            console.log(error);
        }
    },
    getAllUsers: async (req, res) => {
        try {
            let users = await ReaderModel.find();
            if (users) {
                res.json({ status: true, users })
            } else {
                res.json({ status: false })
                console.log('error on get users');
            }
        } catch (error) {
            res.json({ status: false, message: 'admin catch error server side :: getAllUsers' });
            console.log(error);
        }

    },
}