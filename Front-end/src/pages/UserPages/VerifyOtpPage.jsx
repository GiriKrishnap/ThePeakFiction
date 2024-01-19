import Swal from 'sweetalert2';
import axios from '../../util/axios'
import React, { useEffect, useState } from 'react'
import { Login, Signup, signupPost } from '../../util/constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { verifyOtpPostAPI } from '../../APIs/userAPI';

//.........................................................................

export default function VerifyOtp() {

    //.........................................................................

    const [otp, setOtp] = useState('');
    const [email, setEmail] = useState('');

    //.........................................................................

    const navigate = useNavigate();
    const location = useLocation();

    //.........................................................................

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get('email');
        if (!email) {
            navigate(Signup);
        } else {
            setEmail(email);
        }
    }, []);
    //.........................................................................

    const handleSubmit = async () => {
        try {
            if (otp.length < 4) {

                toast.error("OTP should be 4 digit", {
                    icon: '😿', style: {
                        borderRadius: '30px',
                        background: '#444',
                        color: '#fff',
                    },
                })

            } else {

                const body = JSON.stringify({
                    otp,
                    email
                });

                const response = await verifyOtpPostAPI(body);

                if (response.data.status) {
                    toast.error(response.data.message, {
                        icon: '😼✔', style: {
                            borderRadius: '30px',
                            background: '#444',
                            color: '#fff',
                        },
                    })
                    navigate(Login);
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
            console.log('catch error on handleSubmit - verifyPage ', error);
            toast.error(error.message);
        }
    }


    //.........................................................................


    return (
        <>
            <div className='h-screen flex justify-center place-items-center text-black'>

                <div className='md:w-1/2 w-full m-10 h-1/2 bg-white rounded-2xl drop-shadow-xl 
                flex flex-col justify-center place-items-center md:p-40 p-20'>

                    <p className='poppins2 md:text-3xl text-2xl'>Email Verification <i class="fa-solid fa-fingerprint"></i> </p>
                    <small className='text-gray-400 mt-2 font-mono'>
                        we have send a code to your email
                    </small>

                    <input type="text" className='w-full p-2 mt-8 rounded-xl bg-gray-200
                    focus:bg-gray-600 focus:text-white tracking-widest text-center poppins2 font-extrabold'
                        onChange={(e) => setOtp(e.target.value)} maxLength={4} placeholder='enter_otp'
                    />

                    <button className='w-full p-2 mt-8 bg-blue-400 text-white
                    rounded-xl hover:bg-blue-600' onClick={handleSubmit}>
                        Verify
                    </button>

                </div>

            </div>
        </>
    )
}
//.........................................................................
