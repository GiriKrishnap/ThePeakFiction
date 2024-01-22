const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateToken = require('../util/generateToken');

//-MODELS---------------------------------------------------
const UserModel = require('../model/UserModel');
const NovelModel = require('../model/novelModel');
const GenreModel = require('../model/genreModel');
const WalletModel = require('../model/walletModel');
const OtpModel = require('../model/otpModel');
//----------------------------------------------------------
const { sendOtp, changePasswordEmail } = require('../util/generateOTP')
//----------------------------------------------------------

module.exports = {

    readerSignup: async (req, res) => {
        try {

            let isAuthor = req.body.isAuthor;
            let emailExist = await UserModel.findOne({ email: req.body.email });


            if (emailExist) {

                if (emailExist.is_verified) {

                    res.json({ status: false, message: "User Already Exists", });
                } else {

                    res.json({ status: false, message: "Email Not Verified", need_verify: true });
                }

            } else {

                const securePassword = await bcrypt.hash(req.body.password, 10);

                const { email, userName } = req.body

                const userCreate = await UserModel.create({
                    userName: userName,
                    email: email,
                    password: securePassword,
                    is_Author: isAuthor
                })

                await WalletModel.create({
                    user_id: userCreate._id
                })

                sendOtp(email);

                let details = {
                    firstName: userName,
                    email: email,
                    is_Author: isAuthor
                }

                res.json({ status: true, details });

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

            } else if (emailExist.is_Block) {

                res.json({ status: false, message: "Account Blocked by Admin" });

            } else if (!emailExist.is_verified) {

                res.json({ status: false, message: "Email Not Verified", need_verify: true });
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

                    res.json({ status: true, message: 'Login successful', details });
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

    verifyOtp: async (req, res) => {
        try {

            const { email, otp } = req.body;

            const otpExist = await OtpModel.findOne({ email: email });

            if (!otpExist) {

                res.json({ status: false, message: 'Create a Account First ‼' })

            } else if (otpExist.otp === otp) {

                await otpExist.deleteOne()
                await UserModel.updateOne({ email: email }, { $set: { is_verified: true } });

                res.json({ status: true, message: 'Verified' })

            } else {

                res.json({ status: false, message: 'Wrong Otp' })
            }



        } catch (error) {
            res.status(400).json({ status: false, message: 'server catch error :: verifyOtp' });
            console.log('catch error :: verifyOtp', error.message);
        }
    },
    //---------------------------------------------------------
    changePasswordRequest: async (req, res) => {
        try {

            const { email } = req.body;
            console.log(email);

            const user = await UserModel.findOne({ email: email });
            if (!user) {
                res.json({ status: false, message: 'email not found' });
            } else if (user.is_verified === false) {

                res.json({ status: false, message: 'Email Not Verified' });

            } else {

                if (user) {
                    const userId = user._id;
                    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
                        expiresIn: "10m"
                    })

                    if (token) {
                        const link = `http://localhost:3000/new-password?token=${token}`;
                        changePasswordEmail(email, link);
                        res.json({ status: true });
                    }
                }
            }

        } catch (error) {
            console.log('catch error :: changePasswordRequest', error.message);
            res.status(400).json({ status: false, message: 'server catch error :: changePasswordRequest' });
        }
    },
    //---------------------------------------------------------
    changePassword: async (req, res) => {
        try {

            const { token, password } = req.body;
            console.log('token - ', token, 'password - ', password);
            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {

                if (err) {

                    console.error('Token verification failed:', err.message);
                    res.json({ status: false, message: 'Link Expired' });

                } else {

                    const userIdFromToken = decoded.userId;
                    const securePassword = await bcrypt.hash(password, 10);

                    await UserModel.updateOne({ _id: userIdFromToken }, { $set: { password: securePassword } });
                    res.json({ status: true, message: 'password changed' });

                }
            });

        } catch (error) {
            res.status(400).json({ status: false, message: 'server catch error :: changePassword' });
            console.log('catch error :: changePassword', error.message);
        }
    }
    //---------------------------------------------------------

}

//---------------------------------------------------------
