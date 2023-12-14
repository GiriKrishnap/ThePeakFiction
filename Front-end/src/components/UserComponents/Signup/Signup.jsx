import React, { useEffect, useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../../../util/axios'
import { Login, readerHome, signupPost } from '../../../util/constants';

export default function Signup() {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [confirmPassword, SetConfirmPassword] = useState('');

    const navigate = useNavigate();
    ///
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Fill the Password correctly!',
                showConfirmButton: false,
                timer: 1500
            })
        }
        const body = JSON.stringify({
            userName,
            email,
            password
        });

        let response = await axios.post(signupPost, body, { headers: { "Content-Type": "application/json" } });
        if (response.data.status === true) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500
            }).then(() => navigate('/'))
        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500
            })
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            navigate(readerHome);
        }
    }, []);

    return (
        <>
            <div className='outerDiv-login'>
                <div className='mainBody-login'>
                    <div className="row flex flex-col md:flex-row">
                        <div className='right-login w-full md:w-1/2'>

                            <div>
                                <form action="" onSubmit={handleSubmit}>
                                    <h1 className='font-sans text-4xl font-medium mb-5'>Signup</h1>
                                    <input type="text" name="userName" className='input-login d-block' placeholder='userName'
                                        onChange={e => setUserName(e.target.value)} value={userName} required />
                                    <input type="email" name="email" className='input-login d-block' placeholder='Email'
                                        onChange={e => setEmail(e.target.value)} value={email} required />
                                    <input type="password" name="password" className='input-login d-block' placeholder='Password'
                                        onChange={e => SetPassword(e.target.value)} value={password} required />
                                    <input type="password" name="ConfirmPassword" className='input-login d-block' placeholder='Confirm Password'
                                        onChange={e => SetConfirmPassword(e.target.value)} value={confirmPassword} required />
                                    <button type='submit' className='button-login mb-3'>Signup Now</button>
                                </form>
                                <Link to={Login}> <p className='aTag-login'>You Have Account?</p> </Link>
                            </div>
                        </div>

                        <div className='left-login hover-scale w-full md:w-1/2 flex flex-col place-items-center bg-gray-800'>

                            <img src="../assets/logo/webLogo.png" alt="logo" className='logo-login' />
                            <h1 className='text-white handwrite-font text-3xl'>ThePeakFiction</h1>
                            <p className='text-white dancing-font mb-6'>"Unlock worlds, one page at a time."</p>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
