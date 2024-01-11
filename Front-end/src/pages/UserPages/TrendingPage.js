import React from 'react'
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
import NewUpdatedComponents from '../../components/PostComponents/gridePost.jsx';
import { getTrendingPost } from '../../util/constants.js';

export default function Updated() {
    return (
        <div>
            <HeaderComponents />
            <NewUpdatedComponents axiosUrl={getTrendingPost} title={"TRENDING"} />
            <FooterComponents />
        </div>
    )
}

