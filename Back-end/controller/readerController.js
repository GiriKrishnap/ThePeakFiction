const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcrypt');
const generateToken = require('../util/generateToken')

//-MODELS---------------------------------------------------
const ReaderModel = require('../model/readerModel');
const AuthorModel = require('../model/authorModel');
const NovelModel = require('../model/novelModel');
const GenreModel = require('../model/genreModel');
//----------------------------------------------------------

module.exports = {

    readerSignup: async (req, res) => {
        try {

            let isAuthor = req.body.isAuthor;
            let emailExist = await ReaderModel.findOne({ email: req.body.email });
            let emailExistAuthor = await AuthorModel.findOne({ email: req.body.email });

            if (emailExist || emailExistAuthor) {

                res.status(400).json("User Already Exists")

            } else {

                const securePassword = await bcrypt.hash(req.body.password, 10);
                if (isAuthor) {

                    const authorCreate = AuthorModel.create({
                        userName: req.body.userName,
                        email: req.body.email,
                        password: securePassword
                    })

                } else {

                    const userCreate = ReaderModel.create({
                        userName: req.body.userName,
                        email: req.body.email,
                        password: securePassword

                    })
                }

                let details = {
                    firstName: req.body.userName,
                    email: req.body.email,
                }

                res.status(201).json(details)
            }

        } catch (error) {
            res.json(error.message);
            console.log(error + 'error in reader signup' + error.message);
        }
    },
    //---------------------------------------------------------
    readerLogin: async (req, res) => {
        try {

            let emailExist = ''

            if (req.body.isAuthor) {

                emailExist = await AuthorModel.findOne({ email: req.body.email });

            } else {

                emailExist = await ReaderModel.findOne({ email: req.body.email })
            }

            if (!emailExist) {

                res.status(400).json("User Does Not Exist")

            } else {

                const checkPassword = await bcrypt.compare(req.body.password, emailExist.password);

                if (!checkPassword) {

                    res.json({ status: false, message: "Wrong Password" })

                } else {

                    const details = {

                        id: emailExist._id,
                        userName: emailExist.userName,
                        email: emailExist.email,
                        token: generateToken(emailExist._id, req.body.isAuthor),
                        isAuthor: req.body.isAuthor
                    }

                    res.status(200).json(details);
                }
            }

        } catch (error) {

            res.json({ status: false, message: "oops catch error" });
            console.log(error + 'error in reader LOGIN' + error.message);
        }
    },
    //---------------------------------------------------------
    getMostViewed: async (req, res) => {
        try {

            const most = await NovelModel.find({ status: { $ne: "pending" } }).sort({ 'views': -1 }).limit(6);

            if (most) {

                res.json({ status: true, most });
            }
        } catch (error) {

            res.json({ status: false, message: 'catch Error :: getMostViewed' })
            console.log('catch Error :: getMostViewed ' + error.message);
        }
    },

    //---------------------------------------------------------
    getTrending: async (req, res) => {
        try {
            const novels = await NovelModel.find({ status: { $ne: "pending" } }).sort({ 'in_library': 1 }).limit(6);

            if (novels) {

                res.json({ status: true, novels });
            }
        } catch (error) {

            res.json({ status: false, message: 'catch Error :: getMostViewed' })
            console.log('catch Error :: getMostViewed ' + error.message);
        }
    },

    //--------------------------------------------------------- 
    getRandom: async (req, res) => {
        try {

            const random = await NovelModel.aggregate([
                { $match: { status: { $ne: "pending" } } },
                { $match: { status: { $ne: "hide" } } },
                { $sample: { size: 1 } },
                {
                    $lookup: {
                        from: 'authordatas',
                        localField: 'author_id',
                        foreignField: '_id',
                        as: 'author',
                    },
                },
                { $unwind: '$author' },
            ]);


            if (random) {

                res.json({ status: true, random });
            }
        } catch (error) {
            res.json({ status: false, message: 'catch Error :: getMostViewed' })
            console.log('catch Error :: getMostViewed ' + error.message);
        }
    },
    //---------------------------------------------------------
    getAllNovels: async (req, res) => {
        try {

            const novels = await NovelModel.find({ status: { $ne: "pending" } })
                .sort({ 'publish_date': -1 })
                .populate('genre')
                .populate('author_id');

            if (novels) {

                res.json({ status: true, novels });
            } else {

                res.json({ status: false });
            }

        } catch (error) {

            res.json({ status: false, message: 'catch error :: getALlNovels' })
            console.log('catch error :: getAllNovels - readerController ' + error.message)
        }
    },
    //---------------------------------------------------------
    filterNovel: async (req, res) => {
        try {

            const genre = req.body.selectedGenres
            const sort = req.body.selectedSort
            const year = req.body.selectedYear
            const status = req.body.selectedStatus
            const search = req.body.search


            const sortObject = {};
            if (sort === 'title') {
                sortObject[sort] = 1;
            } else {
                sortObject[sort] = -1;
            }

            const startDate = year ? new Date(`${year}-01-01`) : null;
            const endDate = year ? new Date(`${Number(year) + 1}-01-01`) : null;

            const query = {
                $and: [
                    genre.length > 0 ? { genre: { $all: genre } } : {},
                    year ? { publish_date: { $gte: startDate, $lt: endDate } } : {},
                    status ? { status: status } : {},
                    search ? { title: { $regex: new RegExp(search, 'i') } } : {}
                ]
            };


            const novels = await NovelModel.find(query)
                .sort(sortObject)
                .populate('genre')
                .populate('author_id')


            res.json({ status: true, novels });


        } catch (error) {
            res.json({ status: false, message: 'catch error :: filterNovels' })
            console.log('catch error :: filterNovels - readerController ', error.message)
        }
    },
    //---------------------------------------------------------
    getNovelWithId: async (req, res) => {
        try {

            const novelId = req.params.novelId
            if (novelId) {

                NovelModel.findOne({ _id: novelId })
                    .populate('author_id')
                    .populate('genre')
                    .then((response) => {
                        res.json({ novel: response });
                    })

            } else {
                res.status(400)
            }

        } catch (error) {
            res.json({ status: false, message: 'catch error ::getNovelWithId server-side' })
            console.log('catch error ::getNovelWithId - ', error.message)
        }
    }
}