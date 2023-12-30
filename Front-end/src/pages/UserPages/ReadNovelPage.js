import React from 'react'
import HeaderComponents from '../../components/UserComponents/header.jsx';
import FooterComponents from '../../components/UserComponents/footer.jsx';
import ReadNovelComponents from '../../components/UserComponents/ReadNovel.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <ReadNovelComponents />
            <FooterComponents />
        </div>
    )
}

export default HomePage;