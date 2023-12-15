import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from '../../util/axios'
import { adminDashboard, adminGetAllAuthors } from '../../util/constants';

export default function AuthorManagement() {

    const [authors, setAuthors] = useState([]);


    useEffect(() => {
        getAuthorsList();
    }, [])

    const getAuthorsList = () => {
        try {
            axios.get(adminGetAllAuthors).then((re) => {
                if (re.data.status) {
                    setAuthors(re.data.authors);
                    console.log(re.data.authors)
                } else { alert('there is problem') }

            });

        } catch (error) {
            console.log("error in getUsersList function client side");
        }
    }

    return (
        <div className='ml-80 m-10'>
            <h1 className='m-10 font-mono font-extrabold text-sm md:text-3xl'>Author Management</h1>
            <br />
            {
                authors.length > 0 ? <div className="relative overflow-x-auto rounded-xl">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Pen Name & _id
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
                                authors.map((user, index) => (

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
                </div> : <p className='text-2xl rounded-lg text-white font-bold font-mono bg-blue-300'>There is no authors</p>
            }

        </div>
    )
}
