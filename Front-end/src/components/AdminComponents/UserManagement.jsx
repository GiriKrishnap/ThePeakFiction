import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from '../../util/axios'
import { adminDashboard, adminGetAllUsers, adminLoginPost } from '../../util/constants';

export default function UserManagement() {

    const [users, setUsers] = useState([]);


    useEffect(() => {
        getUsersList();
    }, [])

    const getUsersList = () => {
        try {
            axios.get(adminGetAllUsers).then((re) => {
                if (re.data.status) {
                    setUsers(re.data.users);
                    console.log(re.data.users)
                } else { alert('there is problem') }

            });

        } catch (error) {
            console.log("error in getUsersList function client side");
        }
    }

    return (
        <div className='ml-80 m-10'>
            <h1 className='m-10 font-mono font-extrabold text-sm md:text-3xl'>UserManagement</h1>
            <br />
            {
                users.length > 0 ? <div className="relative overflow-x-auto rounded-xl">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    userName & _id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Wallet
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((user, index) => (

                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.userName} <br />
                                            id : {user._id}
                                        </th>
                                        <td className="px-6 py-4">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4">
                                            "Coming Soon"
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Block</button>
                                        </td>
                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>
                </div> : <p className='text-2xl rounded-lg text-white font-bold font-mono bg-blue-300'>There is no users</p>
            }

        </div>
    )
}
