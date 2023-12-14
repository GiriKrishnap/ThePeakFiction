import React, { useEffect, useState } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../../../util/axios'
import { loginPost, authorHome, readerHome, Signup } from '../../../util/constants';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, SetPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const body = JSON.stringify({
                email,
                password
            });

            const response = await axios.post(loginPost, body, { headers: { "Content-Type": "application/json" } });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);

                if (response.data.Author) { navigate(authorHome) }
                else { navigate(readerHome) }

            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: response.data.message,
                    showConfirmButton: false,
                    timer: 1500
                })
            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            navigate(readerHome);
        }
    }, [])

    return (
        <>
            <div className='outerDiv-login'>
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
                                        onChange={e => setEmail(e.target.value)} value={email} />
                                    <input type="password" name="password" className='input-login d-block' placeholder='Password'
                                        onChange={e => SetPassword(e.target.value)} value={password} />
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
