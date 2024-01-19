import axios from '../util/axios'
import {
    AdminGetAllNovels, adminGenresPost, adminGetAllAuthors, adminGetAllGenres, adminGetAllUsers,
    adminNovelApprove, adminNovelHide, admin_block_user_Url, admin_list_genre_Url, getRandomPost
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
export const adminBlockUserAPI = (body) => axios.post(admin_block_user_Url, body, configToken);
export const adminListGenreAPI = (body) => axios.post(admin_list_genre_Url, body, configToken);
