import React from 'react'
import HeaderComponents from '../../components/UserComponents/header.jsx';
import FooterComponents from '../../components/UserComponents/footer.jsx';
import NovelDetailedViewComponents from '../../components/UserComponents/novelDetailedView.jsx';


function NovelDetailPage() {
    return (
        <div>
            <HeaderComponents />
            <NovelDetailedViewComponents />
            <FooterComponents />
        </div>
    )
}

export default NovelDetailPage;