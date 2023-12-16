const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcrypt');
const moment = require('moment');

const ReaderModel = require('../model/readerModel');
const AuthorModel = require('../model/authorModel');
const NovelModel = require('../model/novelModel')

module.exports = {

    authorCreate: async (req, res) => {
        try {
            const { title, description } = req.body;
            const CoverPath = req.file.path;
            const genre = req.body.genre.split(',')
            const checkExist = await NovelModel.findOne({ title: title });
            const currentDate = moment().format('DD-MM-YYYY');


            if (checkExist) {
                res.json({ status: false, message: "Name Already Taken!" });
            } else {
                const novelCreate = await NovelModel.create({
                    title: title,
                    description: description,
                    cover: CoverPath,
                    genre: genre,
                    publish_date: currentDate,
                })
                res.json({ status: true, message: 'Novel Created!' });
            }
        } catch (error) {
            res.json({ status: false, message: "oops catch error" });
            console.log(error + 'error in AuthorCreateNovel');
        }
    },
    /////////////////////////

}