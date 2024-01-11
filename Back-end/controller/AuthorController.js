const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcrypt');
const moment = require('moment');
//-MODELS--------------------------------------------------
const UserModel = require('../model/UserModel');
const NovelModel = require('../model/novelModel')
//---------------------------------------------------------
module.exports = {

    authorCreate: async (req, res) => {
        try {

            const { title, description, authorId } = req.body;

            const CoverPath = req.file.path;
            const genre = req.body.genre.split(',')
            const currentDate = moment().format('YYYY-MM-DD');

            NovelModel.create({

                title: title,
                description: description,
                cover: CoverPath,
                genre: genre,
                publish_date: new Date(currentDate),
                updated_date: new Date(currentDate),
                author_id: authorId

            }).then(() => {
                res.json({ status: true, message: 'Novel Created!' });
            })


        } catch (error) {

            res.status(400).json({ status: false, message: "oops catch error" });
            console.log(error + ' error in AuthorCreateNovel ' + error.message);
        }
    },

    //------------------------------------------------
    getAllAuthorNovels: async (req, res) => {
        try {
            const authorId = req.params.id;
            console.log("authorId -- -- ", authorId);

            const novels = await NovelModel.find({ author_id: authorId }).sort({ publish_date: -1 }).populate('genre');
            res.json({ status: true, novels })


        } catch (error) {
            res.status(400).json({ status: false, message: "oops catch error" });
            console.log(error + ' error in AuthorGetNovels ' + error.message);
        }
    },

    //--------------------------------------------------
    addChapter: async (req, res) => {
        try {
            const { NovelId, title, content, gcoin, chapterNumber } = req.body;

            const obj = {
                number: chapterNumber,
                title,
                content,
                publish_date: new Date(),
                gcoin: gcoin || 0
            }

            NovelModel.updateOne({ _id: NovelId }, { $push: { chapters: obj }, $inc: { chapter_count: chapterNumber } }).then(() => {
                res.json({ status: true, message: 'created' })
            })

        } catch (error) {
            res.status(400).json({ status: false, message: "oops catch error ::addChapter serverSide" });
            console.log('catch error on :: addChapter - ', error.message)
        }
    },

    //--------------------------------------------------

 
}
