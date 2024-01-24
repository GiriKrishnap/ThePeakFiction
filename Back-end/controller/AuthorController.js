const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcrypt');
const moment = require('moment');
//-MODELS--------------------------------------------------
const GenreModel = require('../model/genreModel');
const NovelModel = require('../model/novelModel')
const CommunityModel = require('../model/communityModel')
//---------------------------------------------------------
module.exports = {

    authorCreate: async (req, res) => {
        try {

            const { title, description, authorId } = req.body;
            console.log(title, description, authorId);

            const CoverPath = req.file.path;
            const genre = req.body.genre.split(',')
            const currentDate = moment().format('YYYY-MM-DD');

            const novelCreate = await NovelModel.create({

                title: title,
                description: description,
                cover: CoverPath,
                genre: genre,
                publish_date: new Date(currentDate),
                updated_date: new Date(currentDate),
                author_id: authorId

            })
            if (novelCreate) {

                await CommunityModel.create({
                    name: `${novelCreate.title} Community`,
                    novel_id: novelCreate._id
                })

                res.json({ status: true, message: 'Novel Created!' });

            } else {

                res.json({ status: false, message: "error on backend!" });
            }

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

            NovelModel.updateOne({ _id: NovelId }, { $push: { chapters: obj }, $inc: { chapter_count: 1 } }).then(() => {
                res.json({ status: true, message: 'created' })
            })

        } catch (error) {
            res.status(400).json({ status: false, message: "oops catch error ::addChapter serverSide" });
            console.log('catch error on :: addChapter - ', error.message)
        }
    },

    //--------------------------------------------------

    paymentEligibleCheck: async (req, res) => {
        try {

            const { NovelId } = req.body;
            const novelCheck = await NovelModel.findOne({ _id: NovelId });

            if (novelCheck.views > 1000) {

                await NovelModel.updateOne({ _id: NovelId }, { $set: { gcoin_system: true } });

                res.json({ status: true });
            } else {
                res.json({ status: false });
            }
        } catch (error) {
            res.status(400).json({ status: false, message: "oops catch error ::paymentEligibleCheck serverSide" });
            console.log('catch error on :: paymentEligibleCheck - ', error.message);
        }
    },

    //--------------------------------------------------------

    getAllGenresAuthor: async (req, res) => {
        try {

            let genres = await GenreModel.find({ is_Hide: false });

            if (genres) {

                res.json({ status: true, genres })

            } else {

                res.json({ status: false })
                console.log('error on get genres');

            }

        } catch (error) {
            res.status(400).json({ status: false, message: 'admin catch error server side :: getAllGenres' });
            console.log("catch error getAllGenre " + error.message);
        }

    },
    //---------------------------------------------------------
    cancelNovel: async (req, res) => {
        try {

            const { novelId } = req.body
            console.log(novelId);
            const novelCancel = await NovelModel.updateOne({ _id: novelId }, { $set: { status: 'cancelled' } });
            if (novelCancel) {
                res.json({ status: true, message: 'Novel Cancelled' });
            }

        } catch (error) {
            console.log('catch error on :: cancelNovel - ', error.message)
            res.status(400).json({ status: false, message: "oops catch error ::cancelNovel serverSide" });
        }
    },
    //---------------------------------------------------------
    deleteChapter: async (req, res) => {
        try {

            const { novelId, chapterId } = req.body
            console.log(novelId, chapterId);

            const novelCancel = await NovelModel.updateOne({ _id: novelId },
                {
                    $pull: { chapters: { _id: chapterId } },
                    $inc: { chapter_count: -1 }
                }
            );

            if (novelCancel) {
                res.json({ status: true, message: 'Chapter Deleted' });
            }

        } catch (error) {
            console.log('catch error on :: cancelNovel - ', error.message)
            res.status(400).json({ status: false, message: "oops catch error ::cancelNovel serverSide" });
        }
    },

    //---------------------------------------------------------

    chapterEditDetails: async (req, res) => {
        try {

            const { novelId, chapterId } = req.query
            console.log(novelId, chapterId);

            const chapter = await NovelModel.findOne(
                { _id: novelId, "chapters._id": chapterId },
                { "chapters.$": 1 }
            );



            if (chapter) {
                res.json({ status: true, content: chapter.chapters[0].content, title: chapter.chapters[0].title });
            }

        } catch (error) {
            console.log('catch error on :: chapterEditDetails - ', error.message)
            res.status(400).json({ status: false, message: "oops catch error ::chapterEditDetails serverSide" });
        }
    },
    //---------------------------------------------------------

    chapterEditPost: async (req, res) => {
        try {

            const { NovelId, chapterId, title, content } = req.body;

            const result = await NovelModel.updateOne(
                { _id: NovelId, "chapters._id": chapterId },
                { $set: { "chapters.$.title": title, "chapters.$.content": content } }
            );

            if (result) {
                res.json({ status: true });
            } else {
                res.json({ status: false });
            }

        } catch (error) {
            console.log('catch error on :: chapterEditDetails - ', error.message)
            res.status(400).json({ status: false, message: "oops catch error ::chapterEditDetails serverSide" });
        }
    }

    //---------------------------------------------------------

}

