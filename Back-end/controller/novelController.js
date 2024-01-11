const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const generateToken = require('../util/generateToken');

//-MODELS---------------------------------------------------
const UserModel = require('../model/UserModel');
const NovelModel = require('../model/novelModel');
const GenreModel = require('../model/genreModel');
const WalletModel = require('../model/walletModel');
//----------------------------------------------------------

module.exports = {

    getMostViewed: async (req, res) => {
        try {

            const novels = await NovelModel.find({ status: { $ne: "pending" }, is_hide: false })
                .sort({ 'views': -1 });

            if (novels) {

                res.json({ status: true, novels });
            }

        } catch (error) {

            res.status(400).json({ status: false, message: 'catch Error :: getMostViewed' })
            console.log('catch Error :: getMostViewed ' + error.message);
        }
    },

    //---------------------------------------------------------

    getTrending: async (req, res) => {
        try {
            const novels = await NovelModel.find({ status: { $ne: "pending" }, is_hide: false })
                .populate('author_id')
                .populate('genre')
                .sort({ 'in_library': -1 })

            if (novels) {

                res.json({ status: true, novels });
            }

        } catch (error) {

            res.status(400).json({ status: false, message: 'catch Error :: getMostViewed' })
            console.log('catch Error :: getMostViewed ' + error.message);
        }
    },

    //---------------------------------------------------------

    getNewUpdated: async (req, res) => {
        try {
            const novels = await NovelModel.find({ status: { $ne: "pending" }, is_hide: false })
                .populate('author_id')
                .populate('genre')
                .sort({ 'updated_date': -1 })

            if (novels) {

                res.json({ status: true, novels });
            }
        } catch (error) {

            res.status(400).json({ status: false, message: 'catch Error :: getNewUpdated' })
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
            res.status(400).json({ status: false, message: 'catch Error :: getMostViewed' })
            console.log('catch Error :: getMostViewed ' + error.message);
        }
    },

    //---------------------------------------------------------

    getAllNovels: async (req, res) => {
        try {

            const novels = await NovelModel.find({ status: { $ne: "pending" }, is_hide: false })
                .sort({ 'publish_date': -1 })
                .populate('genre')
                .populate('author_id');

            if (novels) {

                res.json({ status: true, novels });
            } else {

                res.json({ status: false });
            }

        } catch (error) {

            res.status(400).json({ status: false, message: 'catch error :: getALlNovels' })
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
                    { is_hide: false },
                    { status: { $ne: "pending" } },
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
            res.status(400).json({ status: false, message: 'catch error :: filterNovels' })
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
                        res.json({ status: true, novel: response });
                    })

            } else {
                res.status(400);
            }

        } catch (error) {
            res.status(400).json({ status: false, message: 'catch error ::getNovelWithId server-side' })
            console.log('catch error ::getNovelWithId - ', error.message)
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

            await NovelModel.updateOne({ _id: novelId }, { $set: { rate: newAverageRating.toFixed(1) } });

            res.json({ status: true, message: 'Rating added successfully' });

        } catch (error) {
            res.status(400).json({ status: false, message: 'server catch error :: addRating' });
            console.log('Catch error: addRating', error.message);
        }
    },

    //---------------------------------------------------------

    getLibraryNovels: async (req, res) => {
        try {

            const { userId } = req.query;


            const userLibrary = await UserModel.findOne({ _id: userId }, { _id: 0, library: 1 })
                .populate({
                    path: 'library',
                    populate: { path: 'author_id genre' }
                })


            if (!userLibrary) {
                res.json({ status: false, message: 'user not found' });
            }

            res.json({ status: true, novels: userLibrary.library });

        } catch (error) {
            res.status(400).json({ status: false, message: 'server catch error :: getLibraryNovels' });
            console.log('catch error :: getLibraryNovels', error.message);
        }
    },

    //---------------------------------------------------------

    addToLibrary: async (req, res) => {
        try {
            const { novelId, userId } = req.body;

            const user = await UserModel.findById(userId);

            if (!user) {
                res.json({ status: false, message: 'User not found' });
                return;
            }

            const isInLibrary = user.library.includes(novelId);

            if (isInLibrary) {

                await UserModel.findByIdAndUpdate(userId, { $pull: { library: novelId } });
                await NovelModel.updateOne({ _id: novelId }, { $inc: { in_library: -1 } });
                res.json({ status: true, message: 'Novel removed from library' });
            } else {

                await UserModel.findByIdAndUpdate(userId, { $push: { library: novelId } });
                await NovelModel.updateOne({ _id: novelId }, { $inc: { in_library: 1 } });
                res.json({ status: true, message: 'Novel added to library' });
            }

        } catch (error) {
            res.status(400).json({ status: false, message: 'server catch error :: addToLibrary' });
            console.log('catch error :: getLibraryNovels', error.message);
        }
    },

    //---------------------------------------------------------

    checkGCoinSystem: async (req, res) => {
        try {

            const { NovelId } = req.query;
            const Novel = await NovelModel.findOne({ _id: NovelId });

            if (Novel.views > 1000) {
                const Novel = await NovelModel.updateOne({ _id: NovelId }, { $set: { gcoin_system: true } });
                res.json({ status: true, message: 'Eligible for Coin System' });
            }

            res.json({ status: false, message: 'Not Eligible for Coin System' });

        } catch (error) {
            res.status(400).json({ status: false, message: "oops catch error ::checkGCoinSystem serverSide" });
            console.log('catch error on :: checkGCoinSystem - ', error.message)
        }
    }
}
//---------------------------------------------------------
