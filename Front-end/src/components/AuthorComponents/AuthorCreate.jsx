import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../../util/axios'
import { loginPost, authorHome, readerHome, Signup, authorCreate, authorNovels, adminGetAllGenres } from '../../util/constants';


export default function AuthorCreate() {

    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [allGenre, setAllGenre] = useState([]);

    useEffect(() => {
        getAllGenres();
    }, [])

    const getAllGenres = () => {
        try {
            axios.get(adminGetAllGenres).then((response) => {
                if (response.data.status) {
                    setAllGenre(response.data.genres)
                    console.log(allGenre)
                } else { alert('there is problem') }

            });

        } catch (error) {
            console.log("error in getGenres function client side");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        var checkboxes = document.getElementsByName("genres");
        var selectedGenres = [];

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selectedGenres.push(checkboxes[i].value);
            }
        }
        console.log(selectedGenres)
    }

    useEffect(() => {
        const authorToken = localStorage.getItem('authorToken');

        if (!authorToken) {
            navigate(Signup);
        }
    }, []);

    return (
        <>
            <div className='m-6 md:m-16 bg-gray-600 p-16 rounded-2xl hover:shadow-2xl'>

                <form className="max-w-2xl mx-auto bg-gray-600" onSubmit={handleSubmit}>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Novel Title</label>
                        <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                          dark:placeholder-gray-400 dark:text-white" placeholder="title for the novel"
                            onChange={e => setTitle(e.target.value)} required />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">Description</label>
                        <textarea id="description" className="bg-gray-50 border border-gray-300 text-gray-700 text-sm rounded-lg
                         focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
                          dark:placeholder-gray-400 dark:text-white" placeholder="give an description"
                            onChange={e => setDescription(e.target.value)} required />
                    </div>

                    <div className='grid md:grid-cols-5 gap-2 grid-cols-2 '>

                        {
                            allGenre.map((item, index) => (

                                <div className="flex items-center mb-4 " key={index + 1}>
                                    <input id={item.id} type="checkbox" value={item.name} name='genres'
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-md focus:ring-blue-500
                                         dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    />

                                    <label className="ms-2 text-sm font-medium text-gray-900 
                                     dark:text-gray-300" >{item.name}</label>
                                </div>
                            ))
                        }
                    </div>

                    <button type="submit" className="hover:text-white text-gray-500 bg-gray-300 hover:bg-gray-800 
                      focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5
                      py-2.5 text-center">
                        Upload Cover
                        <i className="fa-solid fa-upload ml-2"></i>
                    </button>

                    <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600 mt-16
                      focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5
                      py-2.5 text-center">Submit</button>

                    <Link to={authorHome} type="submit" className="text-white bg-red-500 hover:bg-red-600 mt-5
                      focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5
                      py-2.5 text-center">Cancel</Link>
                </form>

            </div >
        </>
    )
}
