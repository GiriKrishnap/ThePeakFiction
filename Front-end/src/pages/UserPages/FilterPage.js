import React from 'react'
import HeaderComponents from '../../components/UserComponents/header.jsx';
import FooterComponents from '../../components/UserComponents/footer.jsx';
import FilterComponents from '../../components/UserComponents/filter.jsx';


function HomePage() {
    return (
        <div>
            <HeaderComponents />
            <FilterComponents />
            <FooterComponents />
        </div>
    )
}

export default HomePage;