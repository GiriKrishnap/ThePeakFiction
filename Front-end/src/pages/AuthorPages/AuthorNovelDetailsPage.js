import React from 'react'
import HeaderComponents from '../../components/UserComponents/header.jsx';
import FooterComponents from '../../components/UserComponents/footer.jsx';
import AuthorNovelDetailComponents from '../../components/AuthorComponents/NovelDetailAuthor.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <AuthorNovelDetailComponents />
            <FooterComponents />
        </div>
    )
}

export default HomePage;