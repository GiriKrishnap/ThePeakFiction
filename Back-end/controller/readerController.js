const jwt = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcrypt');

const ReaderModel = require('../model/readerModel');
const AuthorModel = require('../model/authorModel');
const NovelModel = require('../model/novelModel');

module.exports = {

    readerSignup: async (req, res) => {
        try {
            let isAuthor = req.body.isAuthor;

            if (!isAuthor) {

                const emailExist = await ReaderModel.findOne({ email: req.body.email });
                if (emailExist) {
                    res.json({ status: false, message: 'You Are Already A Member' });
                } else {
                    const securePassword = await bcrypt.hash(req.body.password, 10);
                    const userCreate = ReaderModel.create({
                        userName: req.body.userName,
                        email: req.body.email,
                        password: securePassword
                    })
                    res.json({ status: true, message: 'Your Signup is Success ' });
                }

            } else {
                const emailExist = await AuthorModel.findOne({ email: req.body.email });
                if (emailExist) {
                    res.json({ status: false, message: 'You Are Already A Account' });
                } else {
                    const securePassword = await bcrypt.hash(req.body.password, 10);
                    const authorCreate = AuthorModel.create({
                        userName: req.body.userName,
                        email: req.body.email,
                        password: securePassword
                    })
                    res.json({ status: true, message: 'Your Signup is Success ' });
                }
            }
        } catch (error) {
            res.json({ status: false, message: "oops catch error" });
            console.log(error + 'error in reader signup' + error.message);
        }
    },
    /////////////////////////
    readerLogin: async (req, res) => {
        try {

            if (req.body.isAuthor) {

                const emailExist = await AuthorModel.findOne({ email: req.body.email });

                if (!emailExist) {
                    res.json({ status: false, message: 'Email Not Found! Are you really author?' })
                } else {
                    const checkPassword = await bcrypt.compare(req.body.password, emailExist.password);
                    if (!checkPassword) {
                        res.json({ status: false, message: "Wrong Password" })
                    } else {
                        const authorToken = jwt.sign({
                            userName: emailExist.userName,
                            email: emailExist.email,
                            id: emailExist._id,
                            isAuthor: true
                        }, "secret123", { expiresIn: '7d' });
                        res.json({ status: true, message: 'Your Login is Success', authorToken });
                    }
                }

            } else {
                const emailExist = await ReaderModel.findOne({ email: req.body.email });
                if (!emailExist) {
                    res.json({ status: false, message: 'Email Not Found' })
                } else {
                    const checkPassword = await bcrypt.compare(req.body.password, emailExist.password);
                    if (!checkPassword) {
                        res.json({ status: false, message: "Wrong Password" })
                    } else {
                        const token = jwt.sign({
                            userName: emailExist.userName,
                            email: emailExist.email,
                            id: emailExist._id,
                            isAuthor: false
                        }, "secret123", { expiresIn: '7d' });
                        res.json({ status: true, message: 'Your Login is Success', token });
                    }
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
            // const random = await NovelModel.find().sort({ 'in_library': 1 }).limit(1).populate('author_id')
            // const random = await NovelModel.find().skip(2).limit(1).populate('author_id');

            const random = await NovelModel.aggregate([
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
            const novels = await NovelModel.find({ status: { $ne: "pending" } }).sort({ 'publish_date': -1 }).populate('genre').populate('author_id');
            if (novels) {
                console.log("hai");
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

            const filter = {}
            filter.genre = req.body.selectedGenres
            console.log(filter);

            const novels = await NovelModel.find(filter).populate('genre').populate('author_id');
            console.log(novels);

            // if (novels) {
            //     res.json({ status: true, novels });
            // } else {
            //     res.json({ status: false });
            // }

        } catch (error) {
            res.json({ status: false, message: 'catch error :: filterNovels' })
            console.log('catch error :: filterNovels - readerController ' + error.message)
        }
    },
    //---------------------------------------------------------

}