import React, { useEffect } from 'react'
import LoginComponents from '../../components/UserComponents/Login/Login.jsx'
import { useNavigate } from 'react-router-dom'
import { Login, readerHome } from '../../util/constants.js';



function LoginPage() {

    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user-login'))
        if (user) {
            navigate(readerHome)
        }
    }, [])

    return (
        <div>
            <LoginComponents />
        </div>
    )
}

export default LoginPage;