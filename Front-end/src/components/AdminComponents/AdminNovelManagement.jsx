import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import axios from '../../util/axios'
import { AdminGetAllNovels, adminDashboard } from '../../util/constants';

export default function NovelManagement() {

    const [novels, setNovels] = useState([]);


    useEffect(() => {
        getAllNovels();
    }, [])

    const getAllNovels = () => {
        try {
            axios.get(AdminGetAllNovels).then((re) => {
                if (re.data.status) {
                    setNovels(re.data.novels);
                    console.log(re.data.novels)
                }

            });

        } catch (error) {
            console.log("error in getUsersList function client side");
        }
    }

    return (
        <div className='ml-80 m-10'>
            <h1 className='m-10 font-mono font-extrabold text-sm md:text-3xl'>Novel Management</h1>
            <br />
            {
                novels.length > 0 ? <div className="relative overflow-x-auto rounded-xl">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title & _id
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Author
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Publish Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                novels.map((novel, index) => (

                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <p className='text-xl mb-2 bold-text inline'>{novel.title}</p><br />
                                            <small>id : {novel._id}</small>
                                        </th>
                                        <td className="px-6 py-4">
                                            {novel.author_id.userName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {novel.publish_date}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className='bg-blue-500 hover:bg-blue-700
                                             text-white font-bold py-2 px-4 rounded'
                                                onClick={() => document.getElementById(`my_modal_${index}`).showModal()}>
                                                More <i class="fa-solid fa-circle-info"></i>
                                            </button>
                                            {/* Open the modal using document.getElementById('ID').showModal() method */}

                                            <dialog id={`my_modal_${index}`} className="modal p-6 bg-slate-700 rounded-xl text-white w-2/5">
                                                <div className="modal-box ">
                                                    <img src={`http://localhost:4000/admin/image/${novel._id}`}
                                                        alt="" className='h-52 rounded-lg m-2 drop-shadow-md' />

                                                    <h3 className="font-bold tracking-wide mb-2 poppins text-4xl">{novel.title}</h3>
                                                    <p className="py-4 inline text-gray-200">{novel.description}</p> <br />

                                                    <hr className='m-2 border-blue-400' />

                                                    <p className="py-4 inline text-md font-medium
                                                     text-blue-400 poppins">
                                                        Author:</p> {novel.author_id.userName} <br />

                                                    <p className="py-4 inline text-md font-medium poppins                                                    
                                                     text-blue-400">Genres:</p>
                                                    {
                                                        novel.genre.map((genre) => (
                                                            <p className="py-4 inline ml-1">{genre.name}</p>
                                                        ))
                                                    } <br />

                                                    <p className="py-4 inline text-md font-medium
                                                     text-blue-400 poppins">
                                                        Status:</p> {novel.status} <br />

                                                    <p className="py-4 inline text-md font-medium
                                                     text-blue-400 poppins">
                                                        Publish Date:</p> {novel.publish_date} <br />

                                                    <p className="py-4 inline text-md font-medium
                                                     text-blue-400 poppins">
                                                        InLibrary:</p> {novel.in_library} <br />

                                                    <p className="py-4 inline text-md font-medium
                                                     text-blue-400 poppins">
                                                        Views:</p> {novel.views} <br />

                                                    <p className="py-4 inline text-md font-medium
                                                     text-blue-400 poppins">
                                                        Rate:</p> {novel.rate} <br />

                                                    <div className="modal-action">
                                                        <form method="dialog">
                                                            <button className="btn bg-blue-500 p-2 w-full 
                                                            rounded-md mt-4 hover:bg-blue-600">Close</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </dialog>

                                            {novel.status === 'pending' ? <button className='bg-green-500 hover:bg-green-700
                                             text-white font-bold py-2 px-4 rounded ml-2'>
                                                Approve <i class="fa-solid fa-check"></i>
                                            </button> : ''}

                                            <button className='bg-red-500 hover:bg-red-700
                                             text-white font-bold py-2 px-4 rounded ml-2'>
                                                Hide <i class="fa-solid fa-eye-slash"></i>
                                            </button>
                                        </td>
                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>
                </div> : <p className='text-2xl rounded-lg text-white font-bold font-mono bg-blue-300'>There is no Novels</p>
            }

        </div>
    )
}
