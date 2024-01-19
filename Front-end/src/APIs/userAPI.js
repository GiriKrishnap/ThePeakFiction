import axios from '../util/axios'
import {
    AuthorAddChapterPost,
    RatingsPostUrl, addNovelToLibraryPostUrl, adminGetAllGenres, authorCreatePost, authorGetGenresUrl, checkGCoinSystemUrl, getAllNovelsUsers,
    getAllTheMessageUrl, getAuthorNovels, getFilteredNovelsUsers, getNovelDetailsWithId, getRandomPost, getUserById,
    loginPost,
    newMessagePost, paymentEligibleCheckUrl, signupPost, verifyOtpPost
} from '../util/constants'
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
export const getRandomNovelAPI = () => axios.get(getRandomPost, configToken);
export const getAllNovelsForUsersAPI = () => axios.get(getAllNovelsUsers, configToken);
export const getAllGenresAPI = () => axios.get(adminGetAllGenres, configToken);
export const getNovelDetailsWithIdAPI = (id) => axios.get(`${getNovelDetailsWithId}/${id}`, configToken);
export const getMostViewedNovelsAPI = (url) => axios.get(url, configToken);
export const gridePostAPI = (url) => axios.get(`${url}?userId=${userId}`, configToken);
export const getWalletAPI = () => axios.get(`${getUserById}?userId=${userId}`, configToken);
export const checkGCoinSystemAPI = (novelId) => axios.get(`${checkGCoinSystemUrl}${novelId}`, configToken);
export const getAllMessageAPI = (novelId) => axios.get(`${getAllTheMessageUrl}?novelId=${novelId}`, configToken);


export const userSignUpPostAPI = (body) => axios.post(signupPost, body, config);
export const userLoginPostAPI = (body) => axios.post(loginPost, body, config);
export const verifyOtpPostAPI = (body) => axios.post(verifyOtpPost, body, config);
export const getFilteredNovelsAPI = (body) => axios.post(getFilteredNovelsUsers, body, configToken);
export const RatingPostAPI = (body) => axios.post(RatingsPostUrl, body, configToken);
export const addNovelToLibraryAPI = (novelId) => axios.post(addNovelToLibraryPostUrl, { novelId, userId }, configToken);
export const newMessagePostAPI = (body) => axios.post(newMessagePost, body, configToken);



//AUTHOR
export const getAuthorNovelsAPI = () => axios.get(`${getAuthorNovels}/${userId}`, configToken);
export const authorGetGenresAPI = () => axios.get(authorGetGenresUrl, configToken);

export const authorNovelCreateAPI = (title, formData) => axios.post(`${authorCreatePost}/${title}`, formData, configFormData);
export const authorAddChapterAPI = (body) => axios.post(AuthorAddChapterPost, body, configToken);
export const paymentEligibleCheckAPI = (body) => axios.post(paymentEligibleCheckUrl, body, configToken);
