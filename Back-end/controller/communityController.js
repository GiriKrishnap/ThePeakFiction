const CommunityModel = require('../model/communityModel');
//---------------------------------------------------------

module.exports = {

    getAllMessage: async (req, res) => {
        try {

            const { novelId } = req.query

            const communityExist = await CommunityModel.findOne({ novel_id: novelId })
                .populate('novel_id')
                .populate("messages.user_id");

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

            const { message, user_id, date, novelId } = req.body;

            const data = {
                user_id: user_id,
                message: message,
                date: date,
            }

            const addMessage = await CommunityModel.findOneAndUpdate({ novel_id: novelId },
                { $push: { messages: data } },
                { new: true }
            ).populate('messages.user_id')

            if (addMessage) {
                res.json({ status: true, data: addMessage.messages });
            } else {
                res.json({ status: false });
            }

        } catch (error) {
            console.log('catch error on ::newMessage - ', error.message)
            res.status(400).json({ status: false, message: "oops catch error on newMessage backend" })
        }
    },

    //------------------------------------------------


}


