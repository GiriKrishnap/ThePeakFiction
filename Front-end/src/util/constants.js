export const baseUrl = "http://localhost:4000/";
export const CoverUrl = "http://localhost:4000/admin/image";


//USER SIDE URLS ====>
////READER------------------------------------
export const Signup = '/signup';
export const Login = '/'
export const readerHome = '/Home'

//post
export const signupPost = '/signup';
export const loginPost = '/login'
export const verifyUserToken = '/verifyUserToken'

//homePage
export const getMostViewed = '/getMostViewed'
export const getTrending = '/getTrending'
export const getRandom = '/getRandom'


////AUTHOR--------------------------------------
export const authorHome = '/author'
export const authorNovels = '/author/Novels'
export const authorCreate = '/author/create'
export const authorNovelDetailed = '/author/Novels/'

//post
export const authorCreatePost = '/author/create/'

////////////////////////////////////////////////////////////////////////
//ADMIN SIDE URLS ====>
export const adminLogin = '/admin'
export const adminDashboard = '/admin/dashboard'
export const adminUserManagement = '/admin/users'
export const adminAuthorManagement = '/admin/authors'
export const adminNovelManagement = '/admin/novels'
export const adminGenreManagement = '/admin/genres'

//POST
export const adminLoginPost = '/admin/login'
export const adminDashboardPost = '/admin/dashboard'
export const adminGenresPost = '/admin/addGenre'
export const adminLogout = '/adminLogout'
export const adminNovelApprove = '/admin/approve'

//GET
export const adminGetAllUsers = '/admin/getAllUsers'
export const adminGetAllAuthors = '/admin/getAllAuthors'
export const adminGetAllGenres = '/admin/getAllGenres'
export const AdminGetAllNovels = '/admin/getAllNovels'



export const getNovelCover = '/admin/image/'