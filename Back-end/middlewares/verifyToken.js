const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();


const roles = {

    '/getAllUsers': ['admin'],
    '/getAllAuthors': ['admin'],
    '/getAllGenres': ['admin'],
    '/image': ['admin', "reader", 'author'],
    '/getAllNovels': ['admin'],
    '/admin-dashboard': ['admin'],
    '/addGenre': ['admin'],
    '/approve': ['admin'],
    '/reject': ['admin'],
    '/hideNovel': ['admin'],
    '/block-user': ['admin'],
    '/list-genre': ['admin'],
    '/edit-genre': ['admin'],


    '/getAuthorNovels': ['author'],
    '/getGenres': ['author', 'reader'],
    '/edit-chapter-details': ['author'],
    '/create': ['author'],
    '/addChapter': ['author'],
    '/payment-Eligible-Check': ['author'],
    '/cancel-novel': ['author'],
    '/delete-chapter': ['author'],
    '/edit-chapter': ['author'],
    '/getNovelDetailById': ['author'],
    '/edit-novel': ['author'],


    '/novelWithId': ['author', 'reader'],
    '/getAllNovels-user': ['author', 'reader'],
    '/get-library': ['author', 'reader'],
    '/getMostViewed': ['author', 'reader'],
    '/getNewUpdated': ['author', 'reader'],
    '/getTrending': ['author', 'reader'],
    '/getRandom': ['author', 'reader'],
    '/getWallet': ['author', 'reader'],
    '/check-GCoinSystem': ['author', 'reader'],
    '/all-message': ['author', 'reader'],
    '/checkPayToRead': ['author', 'reader'],
    '/get-community': ['author', 'reader'],
    '/create-payment-intent': ['author', 'reader'],
    '/add-To-library': ['author', 'reader'],
    '/filterNovels-user': ['author', 'reader'],
    '/payment-confirm': ['author', 'reader'],
    '/rateNovel': ['author', 'reader'],
    '/send-message': ['author', 'reader'],
    '/edit-profile': ['author', 'reader'],
    '/PayToReadPost': ['author', 'reader'],
    '/join-community': ['author', 'reader'],
    '/getChapter': ['author', 'reader'],

};


const protect = asyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            console.log('no token')
            return res.status(401).json({ message: 'Unauthorized: Missing or invalid Authorization header' });
        }

        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        const { role } = decoded;

        const parts = req.path.split("/");
        const startingPart = parts[1]
        const allowedRoles = roles[`/${startingPart}`] || [];


        if (!allowedRoles.includes(role)) {
            console.log('Token Forbidden: Insufficient privileges')
            return res.status(403).json({ message: 'Forbidden: Insufficient privileges' });
        }

        req.user = decoded;
        next();

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            console.log(' - Invalid token - ')
            return res.status(401).json({ message: 'Invalid token' });
        }

        // Handle other errors appropriately
        console.error(error);
        console.log('Internal server error')
        return res.status(500).json({ message: 'Internal server error' });
    }
});





module.exports = { protect };
