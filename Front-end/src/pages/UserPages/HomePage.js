import React from 'react'
import HeaderComponents from '../../components/UserComponents/header.jsx';
import FooterComponents from '../../components/UserComponents/footer.jsx';
import HomeComponents from '../../components/UserComponents/home.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <HomeComponents />
            <FooterComponents />
        </div>
    )
}

export default HomePage;