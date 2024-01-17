const jwt = require('jsonwebtoken');
const moment = require('moment');
//-MODELS--------------------------------------------------
const UserModel = require('../model/UserModel');
const NovelModel = require('../model/novelModel');
const CommunityModel = require('../model/communityModel');
//---------------------------------------------------------

module.exports = {

    getAllMessage: async (req, res) => {
        try {

            const { novelId } = req.query

            const communityExist = await CommunityModel.findOne({ novel_id: novelId }).populate('novel_id')

            if (!communityExist) {

                console.log("No communityExist here - ");

                res.json({ status: false, message: 'community not exist in the given id' });

            } else {
 
                console.log("communityExist.name here - ", communityExist.name);
                res.json({ status: true, message: communityExist.messages, members: communityExist.members });
            }


        } catch (error) {
            res.status(400).json({ status: false, message: "oops catch error on getCommunity backend" });
            console.log(error + ' error in getCommunity - ' + error.message);
        }
    },
    //------------------------------------------------
    newMessage: async (req, res) => {
        try {

            const { message, userId, date, novelId } = req.body;

            console.log('hello')

            const data = {
                user_id: userId,
                message: message,
                date: date,

            }

            console.log(data, novelId);

        } catch (error) {
            console.log('catch error on ::newMessage - ', error.message)
            res.status(400).json({ status: false, message: "oops catch error on newMessage backend" })
        }
    },
    //------------------------------------------------


}


