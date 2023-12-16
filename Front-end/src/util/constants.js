export const baseUrl = "http://localhost:4000/";


//USER SIDE URLS ====>
////READER------------------------------------
export const Signup = '/signup';
export const Login = '/'
export const readerHome = '/Home'

//post
export const signupPost = '/signup';
export const loginPost = '/login'
export const verifyUserToken = '/verifyUserToken'


////AUTHOR--------------------------------------
export const authorHome = '/author'
export const authorNovels = '/author/Novels'
export const authorCreate = '/author/create'
export const authorNovelDetailed = '/author/Novels/'

//post
export const authorCreatePost = '/author/create'

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

//GET
export const adminGetAllUsers = '/admin/getAllUsers'
export const adminGetAllAuthors = '/admin/getAllAuthors'
export const adminGetAllGenres = '/admin/getAllGenres'



export const getNovelCover = '/admin/image/:id'