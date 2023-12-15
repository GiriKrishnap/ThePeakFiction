import React from 'react'
import HeaderComponents from '../../components/UserComponents/header.jsx';
import FooterComponents from '../../components/UserComponents/footer.jsx';
import AuthorCreateComponents from '../../components/AuthorComponents/AuthorCreate.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <AuthorCreateComponents />
            <FooterComponents />
        </div>
    )
}

export default HomePage;