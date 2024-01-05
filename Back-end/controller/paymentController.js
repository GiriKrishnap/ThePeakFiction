//-----------------------------
require('dotenv').config();
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIP_SECRET_KEY);
///---------------------------
const UserModel = require('../model/UserModel');
const GenreModel = require('../model/genreModel');
const NovelModel = require('../model/novelModel');
const AuthorModel = require('../model/authorModel');
const WalletModel = require('../model/walletModel');
///---------------------------

const YOUR_DOMAIN = 'http://localhost:4000';
const YOUR_DOMAIN2 = 'http://localhost:3000/profile';


module.exports = {

    ///---------------------------
    createPaymentIntent: async (req, res) => {

        const { amount } = req.body;
        console.log("amount is here - ", amount)

        try {

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ["card"],
                line_items: [
                    {
                        price_data: {
                            currency: "inr",
                            product_data: {
                                name: 'amount'
                            },
                            unit_amount: amount * 100,
                        },
                        quantity: 1,
                    },
                ],
                mode: 'payment',

                success_url: `${YOUR_DOMAIN}/success`,
                cancel_url: `${YOUR_DOMAIN2}`,

            });

            res.json({ id: session.id });

        } catch (error) {
            res.json({ status: false, message: 'server catch error  :: createPayment' });
            console.log(error.message);
        }
    },
    ///---------------------------
    confirmPayment: async (req, res) => {

        // const { paymentIntentId, paymentMethodId, userId, amount, token } = req.body
        // console.log(token)
        // console.log("paymentIntentId - ", paymentIntentId)
        // console.log("paymentMethodId - ", paymentMethodId)

        // try {

        //     const paymentIntent = await stripe.paymentIntents.confirm(
        //         { source: token },
        //         paymentIntentId,
        //         { payment_method: paymentMethodId }
        //     );
        //     console.log(paymentIntent)
        //     if (paymentIntent.status === 'succeed') {

        //         const checkWalletExist = await WalletModel.find({ userId: userId })
        //         const currentDate = moment().format('YYYY-MM-DD');

        //         if (!checkWalletExist) {

        //             WalletModel.create({
        //                 walletAmount: amount,
        //                 amountAdd: {
        //                     amount: amount,
        //                     date: currentDate
        //                 }
        //             }).then(() => {

        //                 res.json({ status: true, message: 'Payment successful!' });
        //             })

        //         } else {

        //             const finalAmount = checkWalletExist.walletAmount + amount;

        //             WalletModel.updateOne(
        //                 { userId: userId },
        //                 {
        //                     $set: {
        //                         walletAmount: finalAmount,
        //                         amountAdd: {
        //                             $push: {
        //                                 amount: amount,
        //                                 date: new Date(currentDate),
        //                             }
        //                         }
        //                     }
        //                 }
        //             ).then(() => {

        //                 res.json({ status: true, message: 'Payment successful!' });
        //             })
        //         }

        //     } else {
        //         res.status(400).json({ error: 'Payment failed' });
        //     }

        // } catch (error) {
        //     res.status(500).json({ error: 'server catch error :: confirm payment' });
        //     console.log(error.message);

        // }
    }
    ///---------------------------
    ///---------------------------
    ///---------------------------
}


