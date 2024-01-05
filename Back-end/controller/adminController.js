///---------------------------
const jwt = require('jsonwebtoken');
const path = require('path')
require('dotenv/config');
///---------------------------
const UserModel = require('../model/UserModel');
const GenreModel = require('../model/genreModel');
const NovelModel = require('../model/novelModel');
///---------------------------


module.exports = {

    ///---------------------------
    adminLogin: async (req, res) => {
        try {

            let email = process.env.ADMIN_EMAIL
            let password = process.env.ADMIN_PASSWORD

            if (req.body.email !== email || req.body.password !== password) {

                res.json({ status: false, message: 'email or password is wrong!' });

            } else {

                const adminToken = jwt.sign({
                    email: email,
                }, 'secret123', { expiresIn: '7d' });

                res.json({ status: true, message: 'the login is completed', adminToken });
            }

        } catch (error) {
            res.json({ status: false, message: 'admin catch error server side :: adminLogin' });
            console.log(error.message);
        }
    },

    ///---------------------------
    getAllUsers: async (req, res) => {
        try {

            let users = await UserModel.find({ is_Author: false });

            if (users) {

                res.json({ status: true, users })

            } else {

                res.json({ status: false })
                console.log('error on get users');
            }

        } catch (error) {
            res.json({ status: false, message: 'admin catch error server side :: getAllUsers' });
            console.log(error.message);
        }

    },

    ///---------------------------
    getAllAuthors: async (req, res) => {
        try {

            let authors = await UserModel.find({ is_Author: false });

            if (authors) {

                res.json({ status: true, authors })

            } else {

                res.json({ status: false })
                console.log('error on get authors');

            }
        } catch (error) {
            res.json({ status: false, message: 'admin catch error server side :: getAllAuthors' });
            console.log(error.message);
        }

    },

    ///---------------------------
    getAllGenres: async (req, res) => {
        try {

            let genres = await GenreModel.find();

            if (genres) {

                res.json({ status: true, genres })

            } else {

                res.json({ status: false })
                console.log('error on get genres');

            }
        } catch (error) {
            res.json({ status: false, message: 'admin catch error server side :: getAllGenres' });
            console.log("catch error getAllGenre " + error.message);
        }

    },

    ///---------------------------
    addGenre: async (req, res) => {
        try {

            let genres = await GenreModel.findOne({ name: req.body.genreName });

            if (genres) {

                res.json({ status: false, message: 'already added' });

            } else {

                const genreAdd = GenreModel.create({
                    name: req.body.genreName,
                    description: req.body.genreDescription,
                }).then(() => {

                    res.json({ status: true, message: 'Added' });

                })

            }
        } catch (error) {
            res.json({ status: false, message: 'admin catch error server side :: addGenres' });
            console.log("catch error addGenre " + error.message);
        }

    },

    ///---------------------------
    getImage: async (req, res) => {
        try {

            const { id } = req.params;

            if (typeof id !== undefined) {

                const novel = await NovelModel.findById(id);

                if (novel) {

                    const imagePath = path.join(__dirname, '..', novel.cover);
                    res.contentType('image/jpeg');
                    res.sendFile(imagePath);

                }

            } else {
                res.json({ status: false })
            }

        } catch (error) {
            console.log('catch error on :: getImage ' + error.message);
        }
    },

    ///---------------------------
    getAllNovels: async (req, res) => {
        try {

            let novels = await NovelModel.find().populate('author_id').populate('genre');

            if (novels) {

                res.json({ status: true, novels })

            } else {

                res.json({ status: false });
                console.og('novels is empty or there is error :: getAllNovels')

            }
        } catch (error) {
            res.json({ status: false, message: 'admin catch error server side :: getAllNovels' });
            console.log('catch error ::giveAllNovels Admin controller ' + error.message);
        }

    },

    ///--------------------------- 
    giveApprove: async (req, res) => {
        try {

            const novel = await NovelModel.updateOne({ _id: req.body.novelId }, { $set: { status: 'ongoing' } });

            if (novel) {

                res.json({ status: true, message: 'Approved' });

            } else {

                res.json({ status: false, message: 'Can\'t Approve' });
            }
        } catch (error) {
            res.json({ status: false, message: 'admin catch error server side :: giveApprove' });
            console.log('catch error at :: giveApprove adminController ' + error.message);
        }
    },

    ///---------------------------
    hideNovel: async (req, res) => {
        try {

            const id = req.query.id
            let isHide = req.query.isHide

            if (id) {

                if (isHide !== false) {

                    await NovelModel.updateOne({ _id: id }, { $set: { is_hide: false } })

                } else {

                    await NovelModel.updateOne({ _id: id }, { $set: { is_hide: true } })
                }
            }

        } catch (error) {
            res.json({ status: false, message: 'admin catch error server side :: hideNovel' });
            console.log('catch error at :: hideNovel adminController - ' + error.message)
        }
    },

    ///---------------------------
    ///---------------------------
    ///---------------------------
    ///---------------------------
}


