import React from 'react'
import HeaderComponents from '../../components/UserComponents/header.jsx';
import FooterComponents from '../../components/UserComponents/footer.jsx';
import NovelDetailedViewComponents from '../../components/UserComponents/novelDetailedView.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <NovelDetailedViewComponents />
            <FooterComponents />
        </div>
    )
}

export default HomePage;