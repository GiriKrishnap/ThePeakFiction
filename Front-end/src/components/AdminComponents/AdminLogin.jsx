import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from '../../util/axios'
import { adminDashboard, adminLoginPost } from '../../util/constants';

export default function AdminLogin() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            email,
            password
        })
        let response = await axios.post(adminLoginPost, body, { headers: { "Content-Type": "application/json" } });
        if (response.data.adminToken) {
            localStorage.setItem("adminToken", response.data.adminToken);
            navigate(adminDashboard);
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
        try {
            const adminToken = localStorage.getItem('adminToken');
            if (adminToken) {
                navigate(adminDashboard);
            }
        } catch (error) {
            console.error('Error in useEffect of adminLogin:', error);
        }
    }, []);


    return (
        <>
            <div class="flex items-center justify-center h-screen bg-blue-950">
                <div class="bg-gray-200 rounded-2xl border hover:shadow-sm p-10 max-w-lg">
                    <div class="flex flex-col items-center space-y-4">
                        <h1 class="font-bold text-2xl text-gray-700 w-4/6 text-center">
                            Welcome Back Boss!
                        </h1>
                        <p class="text-sm text-gray-500 text-center w-5/6">
                            we glad you come back
                        </p>

                        <form action="" onSubmit={handleSubmit} className='flex flex-col items-center space-y-4'>

                            <input
                                type="email"
                                placeholder="Email"
                                class="border-2 rounded-lg w-full h-12 px-4"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                class="border-2 rounded-lg w-full h-12 px-4"
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                            <Link><p className='text-sm'>Forget Password?</p></Link>

                            <button
                                class="bg-blue-500 text-white rounded-md
                             hover:bg-red-500 font-semibold px-4 py-3 w-full"
                                type='submit'
                            > Login Now </button>

                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
