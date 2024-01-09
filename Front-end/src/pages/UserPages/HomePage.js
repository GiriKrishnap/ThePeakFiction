import React from 'react'
import HeaderComponents from '../../components/UserComponents/header.jsx';
import FooterComponents from '../../components/UserComponents/footer.jsx';
import BannerComponents from '../../components/UserComponents/home/banner.jsx';
import RowPostComponent from '../../components/PostComponents/rowPost.jsx';
import NewUpdatedComponents from '../../components/PostComponents/gridePost.jsx';
import { getMostViewedPost, getNewUpdatedPost, getTrendingPost } from '../../util/constants.js';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <BannerComponents />
            <RowPostComponent axiosUrl={getMostViewedPost} title={"MOST VIEWED"} />
            <NewUpdatedComponents axiosUrl={getTrendingPost} limit={4} title={"TRENDING"} />
            <RowPostComponent axiosUrl={getNewUpdatedPost} title={"NEW UPDATED"} />
            <FooterComponents />
        </div>
    )
}

export default HomePage;