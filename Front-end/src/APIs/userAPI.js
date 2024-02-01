import axios from '../util/axios'
//---------------------------------

const user = JSON.parse(localStorage.getItem('user-login'))
const userToken = localStorage.getItem('user-Token')
const userId = user?.id;

//------------------------------

const configToken = {
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken
    },
    withCredentials: true
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
        Authorization: "Bearer " + userToken
    }
}
//.....................................................................

//user-Apis
export const getRandomNovelAPI = () => axios.get('/getRandom', configToken);
export const getAllNovelsForUsersAPI = () => axios.get('/getAllNovels-user', configToken);
export const getAllGenresAPI = () => axios.get('/admin/getAllGenres', configToken);
export const getNovelDetailsWithIdAPI = (id) => axios.get(`/novelWithId/${id}`, configToken);
export const getMostViewedNovelsAPI = (url) => axios.get(url, configToken);
export const gridePostAPI = (url) => axios.get(`${url}?userId=${userId}`, configToken);
export const getWalletAPI = () => axios.get(`/getWallet?userId=${userId}`, configToken);
export const checkGCoinSystemAPI = (novelId) => axios.get(`/check-GCoinSystem?NovelId=${novelId}`, configToken);
export const checkPayToReadAPI = (novelId, chapterNo, userId) => axios.get(`/checkPayToRead?novelId=${novelId}&chapterNo=${chapterNo}&userId=${userId}`, configToken);
export const getAllMessageAPI = (novelId) => axios.get(`/all-message?novelId=${novelId}`, configToken);
export const getCommunityAPI = (userId) => axios.get(`/get-community?userId=${userId}`, configToken);


export const userSignUpPostAPI = (body) => axios.post('/signup', body, config);
// export const userLoginPostAPI = (body) => axios.post('/login', body, config);
// export const userGoogleLoginAPI = (accessToken) =>
export const verifyOtpPostAPI = (body) => axios.post('/verifyUserOtp', body, config);
export const resendOtpAPI = (email) => axios.post('/resend-otp', { email }, config);

export const getFilteredNovelsAPI = (body) => axios.post('/filterNovels-user', body, configToken);
export const RatingPostAPI = (body) => axios.post('/rateNovel', body, configToken);
export const addNovelToLibraryAPI = (novelId) => axios.post('/add-To-library', { novelId, userId }, configToken);
export const newMessagePostAPI = (body) => axios.post('/send-message', body, configToken);
export const changePasswordRequestAPI = (body) => axios.post('/changePassword-request', body, configToken);
export const changePasswordAPI = (body) => axios.post('/changePassword', body, configToken);
export const editProfileAPI = (body) => axios.post('/edit-profile', body, configToken);
export const PayToReadPostAPI = (body) => axios.post('/PayToReadPost', body, configToken);
export const joinCommunityAPI = (body) => axios.post('/join-community', body, configToken);

//...............................................................................................

//AUTHOR
export const getAuthorNovelsAPI = () => axios.get(`/author/getAuthorNovels/${userId}`, configToken);
export const authorGetGenresAPI = () => axios.get('/author/getGenres', configToken);
export const getChapterEditDetailsAPI = (novelId, chapterId) => axios.get(`/author/edit-chapter-details?novelId=${novelId}&chapterId=${chapterId}`, configToken);


export const cancelNovelAPI = (novelId) => axios.post('/author/cancel-novel', { novelId }, configToken);
export const deleteChapterAPI = (body) => axios.post('/author/delete-chapter', body, configToken);
export const authorNovelCreateAPI = (title, formData) => axios.post(`/author/create/${title}`, formData, configFormData);
export const authorAddChapterAPI = (body) => axios.post('/author/addChapter', body, configToken);
export const paymentEligibleCheckAPI = (body) => axios.post('/author/payment-Eligible-Check', body, configToken);
export const PostEditChapterAPI = (body) => axios.post('/author/edit-chapter', body, configToken);
