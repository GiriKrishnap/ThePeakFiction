const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path')

const ReaderModel = require('../model/readerModel');
const AuthorModel = require('../model/authorModel');
const GenreModel = require('../model/genreModel');
const NovelModel = require('../model/novelModel');

require('dotenv/config');
module.exports = {

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
            console.log(error);
        }
    },
    ///---------------------------
    getAllUsers: async (req, res) => {
        try {

            let users = await ReaderModel.find();
            if (users) {
                res.json({ status: true, users })
            } else {
                res.json({ status: false })
                console.log('error on get users');
            }
        } catch (error) {
            res.json({ status: false, message: 'admin catch error server side :: getAllUsers' });
            console.log(error);
        }

    },
    ///---------------------------
    getAllAuthors: async (req, res) => {
        try {

            let authors = await AuthorModel.find();

            if (authors) {
                res.json({ status: true, authors })
            } else {
                res.json({ status: false })
                console.log('error on get authors');
            }
        } catch (error) {
            res.json({ status: false, message: 'admin catch error server side :: getAllAuthors' });
            console.log(error);
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
            console.log(error);
        }

    },
    ///---------------------------
    addGenre: async (req, res) => {
        try {

            let genres = await GenreModel.findOne({ name: req.body.genreName });

            if (genres) {
                res.json({ status: false, message: 'already added' })
            } else {
                const genreAdd = GenreModel.create({
                    name: req.body.genreName,
                    description: req.body.genreDescription,
                })
                res.json({ status: true, message: 'Added' });
            }
        } catch (error) {
            res.json({ status: false, message: 'admin catch error server side :: addGenres' });
            console.log(error);
        }

    },
    ///---------------------------
    getImage: async (req, res) => {

        const { id } = req.params;
        const novel = await NovelModel.findOne({ _id: id });
        if (novel) {
            const imagePath = path.join(__dirname, '..', novel.cover);
            res.contentType('image/jpeg');
            res.sendFile(imagePath);
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
            console.log(error);
        }

    }
    ///---------------------------
    ///---------------------------
    ///---------------------------
    ///---------------------------
    ///---------------------------
    ///---------------------------
}


