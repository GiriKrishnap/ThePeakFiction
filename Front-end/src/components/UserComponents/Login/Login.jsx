import React, { useEffect, useState } from 'react'
import './Login.css'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Signup, VerifyOptPageUrl, loginPost, readerHome } from '../../../util/constants';
import axios from '../../../util/axios'
import { userLoginPostAPI } from '../../../APIs/userAPI';
import toast from 'react-hot-toast';
//.........................................................................


export default function Login() {

    //.........................................................................

    const navigate = useNavigate();

    //.........................................................................

    const [email, setEmail] = useState('');
    const [password, SetPassword] = useState('');

    //.........................................................................


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            if (email || password) {

                const body = JSON.stringify({
                    email,
                    password
                })

                const response = await userLoginPostAPI(body);

                if (response.data.status) {

                    toast.error(response.data.message, {
                        icon: '😼✔', style: {
                            borderRadius: '30px',
                        },
                    })

                    await localStorage.setItem('user-login', JSON.stringify(response.data.details))
                    navigate(readerHome);

                } else if (response.data.need_verify) {

                    toast.error(response.data.message, {
                        icon: '😿🔒', style: {
                            borderRadius: '30px',
                            background: '#444',
                            color: '#fff',
                        },
                    })

                    navigate(`${VerifyOptPageUrl}?email=${email}`);

                } else {

                    toast.error(response.data.message, {
                        icon: '😿❌', style: {
                            borderRadius: '30px',
                            background: '#444',
                            color: '#fff',
                        },
                    })
                }
            }

        } catch (error) {
            console.log(error)
        }
    }

    //.........................................................................

    return (
        <>
            <div className='outerDiv-login md:flex md:flex-col md:mt-16'>
                <div className='mainBody-login'>
                    <div className="flex flex-col md:flex-row">

                        <div className='left-login hover-scale w-full md:w-1/2 flex flex-col place-items-center bg-gray-800'>
                            <img src="../assets/logo/webLogo.png" alt="logo" className='logo-login ' />
                            <h1 className='text-white handwrite-font text-3xl'>ThePeakFiction</h1>
                            <p className='text-white dancing-font mb-6'>"Unlock worlds, one page at a time."</p>

                        </div>

                        <div className='right-login w-full md:w-1/2 '>

                            <div>
                                <h1 className='font-sans text-4xl font-medium mb-3'>Login</h1>
                                <form action="" onSubmit={handleSubmit}>
                                    <input type="email" name="email" className='input-login d-block' placeholder='Email'
                                        onChange={e => setEmail(e.target.value)} value={email} required />
                                    <input type="password" name="password" className='input-login d-block' placeholder='Password'
                                        onChange={e => SetPassword(e.target.value)} value={password} required />
                                    <button type='submit' className='button-login mb-3'>Login Now</button>
                                </form>
                                <Link to={Signup}> <p className='aTag-login'>No Account?</p> </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
//.........................................................................
