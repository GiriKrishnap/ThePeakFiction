const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateToken = require('../util/generateToken');

//-MODELS---------------------------------------------------
const UserModel = require('../model/UserModel');
const NovelModel = require('../model/novelModel');
const GenreModel = require('../model/genreModel');
const WalletModel = require('../model/walletModel');
//----------------------------------------------------------

module.exports = {

    readerSignup: async (req, res) => {
        try {

            let isAuthor = req.body.isAuthor;
            let emailExist = await UserModel.findOne({ email: req.body.email });


            if (emailExist) {

                res.json({ status: false, message: "User Already Exists" });

            } else {

                const securePassword = await bcrypt.hash(req.body.password, 10);

                const userCreate = UserModel.create({
                    userName: req.body.userName,
                    email: req.body.email,
                    password: securePassword,
                    is_Author: isAuthor
                }).then(async (response) => {

                    await WalletModel.create({
                        user_id: response._id
                    })

                    let details = {
                        firstName: req.body.userName,
                        email: req.body.email,
                        is_Author: isAuthor
                    }

                    res.json({ status: true, details });

                })

            }

        } catch (error) {
            res.status(400).json(error.message);
            console.log(error + 'error in reader signup' + error.message);
        }
    },

    //---------------------------------------------------------

    readerLogin: async (req, res) => {
        try {


            console.log('email is here login', req.body.email)
            const emailExist = await UserModel.findOne({ email: req.body.email })


            if (!emailExist) {

                res.json({ status: false, message: "User Does Not Exist" });

            } else {

                const checkPassword = await bcrypt.compare(req.body.password, emailExist.password);

                if (!checkPassword) {

                    res.json({ status: false, message: "Wrong Password" })

                } else {

                    const details = {

                        id: emailExist._id,
                        userName: emailExist.userName,
                        email: emailExist.email,
                        token: generateToken(emailExist._id),
                        isAuthor: emailExist.is_Author
                    }

                    res.json({ status: true, details });
                }
            }

        } catch (error) {

            res.status(400).json({ status: false, message: "oops catch error" });
            console.log(error + 'error in reader LOGIN' + error.message);
        }
    },

    //---------------------------------------------------------

    getWallet: async (req, res) => {
        try {

            const { userId } = req.query;

            const walletDetails = await WalletModel.findOne({ user_id: userId });

            if (!walletDetails) {
                res.json({ status: false, message: 'No Wallet' });
            } else {

                res.json({ status: true, walletDetails });
            }


        } catch (error) {
            res.status(400).json({ status: false, message: 'server catch error :: getUserWithId' });
            console.log('catch error :: getUserWithId', error.message);
        }
    },

    //---------------------------------------------------------

}

//---------------------------------------------------------
