import React from 'react'
import HeaderComponents from '../../components/UserComponents/header.jsx';
import FooterComponents from '../../components/UserComponents/footer.jsx';
import AuthorAddChapter from '../../components/AuthorComponents/AddChapter.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <AuthorAddChapter />
            <FooterComponents />
        </div>
    )
}

export default HomePage;