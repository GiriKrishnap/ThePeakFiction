import React from 'react'
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
import GridePostComponent from '../../components/PostComponents/gridePost.jsx';
import { getLibraryNovelsUrl } from '../../util/constants.js';

export default function Updated() {
    return (
        <div>
            <HeaderComponents />
            <GridePostComponent axiosUrl={getLibraryNovelsUrl} title={"My Library"} />
            <FooterComponents />
        </div>
    )
}

