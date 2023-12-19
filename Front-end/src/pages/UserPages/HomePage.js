import React from 'react'
import HeaderComponents from '../../components/UserComponents/header.jsx';
import FooterComponents from '../../components/UserComponents/footer.jsx';
import BannerComponents from '../../components/UserComponents/home/banner.jsx';
import RowPostComponents from '../../components/UserComponents/home/mostViewRow.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <BannerComponents />
            <RowPostComponents />
            <FooterComponents />
        </div>
    )
}

export default HomePage;