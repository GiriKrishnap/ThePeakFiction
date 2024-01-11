import axios from '../util/axios'
import {
    AdminGetAllNovels,
    AuthorAddChapterPost,
    RatingsPostUrl, adminGenresPost, adminGetAllAuthors, adminGetAllGenres, adminGetAllUsers, adminNovelApprove, adminNovelHide, authorCreatePost, getAllNovelsUsers,
    getAuthorNovels,
    getFilteredNovelsUsers, getNovelDetailsWithId, getRandomPost
} from '../util/constants'
//---------------------------------
const adminToken = localStorage.getItem('adminToken')

//------------------------------
const configToken = {
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + adminToken
    }
}
//------------------------------
const configFormData = {
    headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + adminToken
    }
}

//.....................................................................

export const getRandomNovelAPI = () => axios.get(getRandomPost, configToken);
export const adminGetAllGenreAPI = () => axios.get(adminGetAllGenres, configToken);
export const adminGetAllNovelsAPI = () => axios.get(AdminGetAllNovels, configToken);
export const adminGetAllAuthorsAPI = () => axios.get(adminGetAllAuthors, configToken);
export const adminGetAllUsersAPI = () => axios.get(adminGetAllUsers, configToken);

export const createGenresAPI = (body) => axios.post(adminGenresPost, body, configToken);
export const adminNovelHideAPI = (body) => axios.post(adminNovelHide, body, configToken);
export const adminNovelApproveAPI = (body) => axios.post(adminNovelApprove, body, configToken);
