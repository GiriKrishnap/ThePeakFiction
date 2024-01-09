const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcrypt');
const generateToken = require('../util/generateToken')

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
                }).then(() => {

                    let details = {
                        firstName: req.body.userName,
                        email: req.body.email,
                        is_Author: isAuthor
                    }

                    res.json({ status: true, details });

                })

            }

        } catch (error) {
            res.json(error.message);
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

            res.json({ status: false, message: "oops catch error" });
            console.log(error + 'error in reader LOGIN' + error.message);
        }
    },

    //---------------------------------------------------------
    getMostViewed: async (req, res) => {
        try {

            const novels = await NovelModel.find({ status: { $ne: "pending" } })
                .sort({ 'views': -1 });

            if (novels) {

                res.json({ status: true, novels });
            }

        } catch (error) {

            res.json({ status: false, message: 'catch Error :: getMostViewed' })
            console.log('catch Error :: getMostViewed ' + error.message);
        }
    },

    //---------------------------------------------------------
    getTrending: async (req, res) => {
        try {
            const novels = await NovelModel.find({ status: { $ne: "pending" } })
                .populate('genre')
                .sort({ 'in_library': -1 })

            if (novels) {

                res.json({ status: true, novels });
            }

        } catch (error) {

            res.json({ status: false, message: 'catch Error :: getMostViewed' })
            console.log('catch Error :: getMostViewed ' + error.message);
        }
    },
    //---------------------------------------------------------
    getNewUpdated: async (req, res) => {
        try {
            const novels = await NovelModel.find({ status: { $ne: "pending" } })
                .populate('genre')
                .sort({ 'updated_date': -1 })

            if (novels) {

                res.json({ status: true, novels });
            }
        } catch (error) {

            res.json({ status: false, message: 'catch Error :: getNewUpdated' })
            console.log('catch Error :: getNEwUpdated ' + error.message);
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
                        from: 'userdatas',
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
    },
    //---------------------------------------------------------
    addToLibrary: async (req, res) => {
        try {

            const { userId, novelId } = req.body;

            const addingToLibrary = await UserModel.findByIdAndUpdate({ _id: userId }, { library: { $push: novelId } });

            if (!addingToLibrary) {
                res.json({ status: false, message: 'user not found' });
            }

            res.json({ status: true, message: "Added" });

        } catch (error) {
            res.json({ status: false, message: 'server catch error :: addToLibrary' });
            console.log('catch error :: addToLibrary', error.message);
        }
    },

    //---------------------------------------------------------

    addRating: async (req, res) => {
        try {

            const { userId, rate, novelId } = req.body;


            const existingRating = await NovelModel.findOne({
                _id: novelId,
                "ratings.user_id": userId
            });

            if (existingRating) {

                return res.json({ status: false, message: 'Already rated' });
            };


            const updatedNovel = await NovelModel.findByIdAndUpdate(
                { _id: novelId },
                { $push: { ratings: { user_id: userId, rate: rate } } },
                { new: true }
            );

            const totalRatings = updatedNovel.ratings.reduce((acc, curr) => acc + curr.rate, 0);
            const newAverageRating = totalRatings / updatedNovel.ratings.length;

            await NovelModel.updateOne({ _id: novelId }, { $set: { rate: newAverageRating } });

            res.json({ status: true, message: 'Rating added successfully' });

        } catch (error) {
            res.json({ status: false, message: 'Server catch error: addRating' });
            console.log('Catch error: addRating', error.message);
        }
    },

    //---------------------------------------------------------

    getUserById: async (req, res) => {
        try {

            const { userId } = req.query;
            console.log(userId)

            const walletDetails = await WalletModel.findOne({ user_id: userId });

            if (!walletDetails) {
                res.json({ status: false, message: 'user not found' });
            }

            res.json({ status: true, walletDetails });

        } catch (error) {
            res.json({ status: false, message: 'server catch error :: getUserWithId' });
            console.log('catch error :: getUserWithId', error.message);
        }
    },

}