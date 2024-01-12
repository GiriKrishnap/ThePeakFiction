export const baseUrl = "http://localhost:4000/";
export const CoverUrl = "http://localhost:4000/admin/image";

//////////////////////////////////////////////
///////////USER SIDE URLS =====>
////READER------------------------------------
export const Signup = '/signup';
export const Login = '/'
export const readerHome = '/Home'
export const filter = '/filter'
export const novelDetailedView = '/novelDetailed'
export const readNovel = '/novel/read'
export const profileUrl = '/profile'
export const getUpdatedUrl = '/updated'
export const trendingUrl = '/trending'
export const myLibraryUrl = '/my-library'
export const checkGCoinSystemUrl = '/check-GCoinSystem?NovelId='

//homePage
export const getMostViewedPost = '/getMostViewed'
export const getTrendingPost = '/getTrending'
export const getRandomPost = '/getRandom'
export const getLibraryNovelsUrl = '/get-library'
export const getNewUpdatedPost = '/getNewUpdated'
export const addNovelToLibraryPostUrl = '/add-To-library'

//filter
export const getFilteredNovelsUsers = '/filterNovels-user'
export const getAllNovelsUsers = '/getAllNovels-user'

//post
export const signupPost = '/signup';
export const loginPost = '/login'
export const verifyUserToken = '/verifyUserToken'
export const RatingsPostUrl = '/rateNovel'

//PAYMENT
export const createPaymentIntentURL = '/create-payment-intent'
export const confirmPaymentURL = '/payment-confirm'
export const PaymentSuccessURL = '/profile/success'



////AUTHOR--------------------------------------
export const authorHome = '/author'
export const authorNovels = '/author/Novels'
export const authorCreate = '/author/create'
export const authorNovelDetailed = '/author/Novels/detail'
export const AuthorNovelDetails = '/author/Novels/detail'
export const AuthorAddChapter = '/author/Novels/addChapter'

//post
export const authorCreatePost = '/author/create'
export const getAuthorNovels = '/author/getAuthorNovels'
export const AuthorAddChapterPost = '/author/addChapter'
export const paymentEligibleCheckUrl = '/author/payment-Eligible-Check'

////////////////////////////////////////////////////////////////////////
//////////ADMIN SIDE URLS ====>
export const adminLogin = '/admin'
export const adminDashboard = '/admin/dashboard'
export const adminUserManagement = '/admin/users'
export const adminAuthorManagement = '/admin/authors'
export const adminNovelManagement = '/admin/novels'
export const adminGenreManagement = '/admin/genres'

//POST
export const adminLoginPost = '/admin/login'
export const adminLogout = '/adminLogout'
export const adminDashboardPost = '/admin/dashboard'
export const adminGenresPost = '/admin/addGenre'
export const adminNovelApprove = '/admin/approve'
export const adminNovelHide = '/admin/hideNovel'

//GET
export const adminGetAllUsers = '/admin/getAllUsers'
export const adminGetAllAuthors = '/admin/getAllAuthors'
export const adminGetAllGenres = '/admin/getAllGenres'
export const AdminGetAllNovels = '/admin/getAllNovels'



export const getNovelCover = '/admin/image/'
export const getNovelDetailsWithId = '/novelWithId'
export const getUserById = '/getWallet'