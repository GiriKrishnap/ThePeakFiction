const NovelModel = require('../model/novelModel');

const novelExistChecker = async (req, res, next) => {

    const checkExist = await NovelModel.findOne({ title: req.params.title });

    if (checkExist) {

        res.json({ status: false, message: 'Title Already Exist' });

    } else {

        next();
    }
}

module.exports = novelExistChecker