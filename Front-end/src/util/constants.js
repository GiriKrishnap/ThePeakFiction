export const baseUrl = "http://localhost:4000/";
export const CoverUrl = "http://localhost:4000/admin/image";


//<<<<<<<<<<<<<<<<<<<<<<<<<<//FRONT_END//>>>>>>>>>>>>>>>>>>>>>>>>>>
export const Login = '/'
export const Signup = '/signup';
export const VerifyOptPageUrl = '/verify'

export const readerHome = '/Home'
export const getUpdatedUrl = '/updated'
export const trendingUrl = '/trending'
export const myLibraryUrl = '/my-library'
export const filter = '/filter'
export const profileUrl = '/profile'
export const PaymentSuccessURL = '/profile/success'

export const novelDetailedView = '/novelDetailed'
export const readNovel = '/novel/read'
export const communityPageUrl = '/community'
export const chatPageUrl = '/community/chat'
////AUTHOR
export const authorHome = '/author'
export const authorNovels = '/author/Novels'
export const authorCreate = '/author/create'
export const authorNovelDetailed = '/author/Novels/detail'
export const AuthorNovelDetails = '/author/Novels/detail'
export const AuthorAddChapter = '/author/Novels/addChapter'
//ADMIN
export const adminLogin = '/admin'
export const adminDashboard = '/admin/dashboard'
export const adminUserManagement = '/admin/users'
export const adminAuthorManagement = '/admin/authors'
export const adminNovelManagement = '/admin/novels'
export const adminGenreManagement = '/admin/genres'



//<<<<<<<<<<<<<<<<<<<<<<<<<<//BACK_END//>>>>>>>>>>>>>>>>>>>>>>>>>>
//............Reader-side..............
export const loginPost = '/login'
export const signupPost = '/signup';
export const verifyOtpPost = '/verifyUserOtp'

export const getLibraryNovelsUrl = '/get-library'
export const getMostViewedPost = '/getMostViewed'
export const getTrendingPost = '/getTrending'
export const getRandomPost = '/getRandom'
export const getNewUpdatedPost = '/getNewUpdated'
export const addNovelToLibraryPostUrl = '/add-To-library'
export const RatingsPostUrl = '/rateNovel'
export const getUserById = '/getWallet'

export const getAllTheMessageUrl = '/all-message'
export const newMessagePost = '/send-message'
//filter
export const getFilteredNovelsUsers = '/filterNovels-user'
export const getAllNovelsUsers = '/getAllNovels-user'
//PAYMENT
export const createPaymentIntentURL = '/create-payment-intent'
export const confirmPaymentURL = '/payment-confirm'

export const checkGCoinSystemUrl = '/check-GCoinSystem?NovelId='

//............Author-side..............
export const authorGetGenresUrl = '/author/getGenres'

export const authorCreatePost = '/author/create'
export const getAuthorNovels = '/author/getAuthorNovels'
export const AuthorAddChapterPost = '/author/addChapter'
export const paymentEligibleCheckUrl = '/author/payment-Eligible-Check'

//........Admin-side..........................
export const adminLoginPost = '/admin/login'
export const adminLogout = '/adminLogout'
export const adminDashboardPost = '/admin/dashboard'
export const adminGenresPost = '/admin/addGenre'
export const adminNovelApprove = '/admin/approve'
export const adminNovelHide = '/admin/hideNovel'
export const adminGetAllUsers = '/admin/getAllUsers'
export const adminGetAllAuthors = '/admin/getAllAuthors'
export const adminGetAllGenres = '/admin/getAllGenres'
export const AdminGetAllNovels = '/admin/getAllNovels'

export const admin_block_user_Url = '/admin/block-user'
export const admin_list_genre_Url = '/admin/list-genre'

export const getNovelCover = '/admin/image/'
export const getNovelDetailsWithId = '/novelWithId'