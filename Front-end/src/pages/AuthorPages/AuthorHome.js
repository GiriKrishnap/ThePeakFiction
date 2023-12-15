import React from 'react'
import HeaderComponents from '../../components/UserComponents/header.jsx';
import FooterComponents from '../../components/UserComponents/footer.jsx';
import AuthorHomeComponents from '../../components/AuthorComponents/AuthorHome.jsx';

function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <AuthorHomeComponents />
            <FooterComponents />
        </div>
    )
}

export default HomePage;