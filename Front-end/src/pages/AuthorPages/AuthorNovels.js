import React from 'react'
import HeaderComponents from '../../components/UserComponents/header.jsx';
import FooterComponents from '../../components/UserComponents/footer.jsx';
import AuthorNovelsComponent from '../../components/AuthorComponents/AuthorNovels.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <AuthorNovelsComponent />
            <FooterComponents />
        </div>
    )
}

export default HomePage;