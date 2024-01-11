import toast from 'react-hot-toast';
import React, { useEffect, useState } from 'react'
import { adminGetAllGenreAPI, createGenresAPI } from '../../APIs/adminAPI';
//.........................................................................


export default function UserManagement() {

    //.........................................................................

    const [genre, setGenre] = useState([]);
    const [genreName, setGenreName] = useState('');
    const [genreDescription, setGenreDescription] = useState('');

    //.........................................................................

    useEffect(() => {
        getGenres();
    }, [])

    //.........................................................................

    const getGenres = async () => {
        try {
            const response = await adminGetAllGenreAPI();
            if (response.data.status) {
                setGenre(response.data.genres);
            } else {
                alert('there is problem')
            }

        } catch (error) {
            console.log("error in getGenres function client side - ", error);
            toast.error(error.message);

        }
    }

    //.........................................................................

    const handleAddGenre = async () => {
        try {

            if (!genreName || !genreDescription) {

                toast.error("fill the form!");

            } else {
                const body = JSON.stringify({
                    genreName,
                    genreDescription
                })

                const response = await createGenresAPI(body);
                if (response.data.status) {

                    toast.success("Added");

                    setGenreName('');
                    setGenreDescription('');
                    getGenres();

                } else {
                    toast.error(response.data.message);
                }
            }

        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }

    //.........................................................................


    return (
        <div className='ml-80 m-10'>
            <h1 className='m-10 font-mono font-extrabold text-sm md:text-3xl'>UserManagement</h1>
            <br />

            <button className='btn h-10 p-2 w-1/5 rounded-lg m-2 grid bg-blue-500 text-white
             hover:bg-blue-600 hover:font-mono'
                onClick={() => document.getElementById('my_modal_genre').showModal()}>Add Genre</button>

            <dialog id="my_modal_genre" className="modal bg-blue-200 p-5 w-1/2 rounded-lg">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle bg-blue-100 p-1 w-8 rounded-full btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div className='flex flex-col gap-5 '>

                        <h3 className="font-bold text-lg">Add Genre!</h3>
                        <input type="text" className='rounded-md p-3 w-full' placeholder='name'
                            onChange={e => setGenreName(e.target.value)}
                            value={genreName} />
                        <textarea className='rounded-md p-1 pl-3 w-full' placeholder='description'
                            onChange={e => setGenreDescription(e.target.value)}
                            value={genreDescription} />
                        <p className='rounded-md p-1 pl-3 w-full bg-blue-500 text-white cursor-pointer'
                            placeholder='genre name'
                            onClick={handleAddGenre}
                        >Confirm</p>

                    </div>
                </div>
            </dialog>





            {
                genre.length > 0 ? <div className="relative overflow-x-auto rounded-xl">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Name & _id
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                genre.map((item, index) => (

                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {index + 1}
                                        </th>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <p className='inline text-lg'>{item.name}</p> <br />
                                            <p className='inline scale text-gray-400'>id : {item._id}</p>
                                        </th>
                                        <th className="px-6 py-4 text-gray-300">
                                            {item.description}
                                        </th>
                                        <th className="px-6 py-4 flex gap-3">
                                            <button className='bg-blue-500 hover:bg-blue-700
                                             text-white font-bold py-2 px-4 rounded'>
                                                Edit
                                            </button>

                                            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2
                                             px-4 rounded'>
                                                {item.is_Hide ? 'unHide' : 'Hide'}
                                            </button>

                                        </th>
                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>
                </div> : <p className='text-2xl rounded-lg text-white font-bold font-mono bg-blue-300'>There is no genre</p>
            }

        </div >
    )
}
//.........................................................................