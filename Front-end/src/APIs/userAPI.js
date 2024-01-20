import axios from '../util/axios'
//---------------------------------

const user = JSON.parse(localStorage.getItem('user-login'))
const userId = user?.id;

//------------------------------

const configToken = {
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user?.token
    }
}
//------------------------------
const config = {
    headers: {
        "Content-Type": "application/json",
    }
}
//------------------------------
const configFormData = {
    headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + user?.token
    }
}
//.....................................................................

//Novel-Apis
export const getRandomNovelAPI = () => axios.get('/getRandom', configToken);
export const getAllNovelsForUsersAPI = () => axios.get('/getAllNovels-user', configToken);
export const getAllGenresAPI = () => axios.get('/admin/getAllGenres', configToken);
export const getNovelDetailsWithIdAPI = (id) => axios.get(`/novelWithId/${id}`, configToken);
export const getMostViewedNovelsAPI = (url) => axios.get(url, configToken);
export const gridePostAPI = (url) => axios.get(`${url}?userId=${userId}`, configToken);
export const getWalletAPI = () => axios.get(`/getWallet?userId=${userId}`, configToken);
export const checkGCoinSystemAPI = (novelId) => axios.get(`/check-GCoinSystem?NovelId=${novelId}`, configToken);
export const getAllMessageAPI = (novelId) => axios.get(`/all-message?novelId=${novelId}`, configToken);

export const userSignUpPostAPI = (body) => axios.post('/signup', body, config);
export const userLoginPostAPI = (body) => axios.post('/login', body, config);
export const verifyOtpPostAPI = (body) => axios.post('/verifyUserOtp', body, config);
export const getFilteredNovelsAPI = (body) => axios.post('/filterNovels-user', body, configToken);
export const RatingPostAPI = (body) => axios.post('/rateNovel', body, configToken);
export const addNovelToLibraryAPI = (novelId) => axios.post('/add-To-library', { novelId, userId }, configToken);
export const newMessagePostAPI = (body) => axios.post('/send-message', body, configToken);

//...............................................................................................

//AUTHOR
export const getAuthorNovelsAPI = () => axios.get(`/author/getAuthorNovels/${userId}`, configToken);
export const authorGetGenresAPI = () => axios.get('/author/getGenres', configToken);

export const authorNovelCreateAPI = (title, formData) => axios.post(`/author/create/${title}`, formData, configFormData);
export const authorAddChapterAPI = (body) => axios.post('/author/addChapter', body, configToken);
export const paymentEligibleCheckAPI = (body) => axios.post('/author/payment-Eligible-Check', body, configToken);