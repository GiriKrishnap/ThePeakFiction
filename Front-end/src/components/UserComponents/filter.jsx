import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import axios from '../../util/axios'
import { CoverUrl, adminGetAllGenres, filter, getAllNovelsUsers, getFilteredNovelsUsers } from '../../util/constants';



function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Banner() {

    const [novels, setNovels] = useState([]);
    const [allGenre, setAllGenre] = useState([]);
    console.log(allGenre)

    useEffect(() => {
        getAllGenres();
        getAllNovels();
    }, [])


    const getAllNovels = async () => {
        try {
            const response = await axios.get(getAllNovelsUsers)
            if (response.data.status) {
                setNovels(response.data.novels)
                console.log(response.data.novels)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getAllGenres = () => {
        try {
            axios.get(adminGetAllGenres).then((response) => {
                if (response.data.status) {
                    setAllGenre(response.data.genres)
                    allGenre.sort()
                } else { alert('there is problem') }

            });

        } catch (error) {
            console.log("error in getGenres function client side");
        }
    }

    const handleFilter = async () => {
        try {
            var checkboxes = document.getElementsByName("genres");
            var selectedGenres = [];

            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedGenres.push(checkboxes[i].value);
                }
            }


            const body = JSON.stringify({
                selectedGenres
            })

            const response = await axios.post(getFilteredNovelsUsers, body, { headers: { "Content-Type": "application/json" } })
            if (response.data.status) {
                setNovels(response.data.novels);
            }

        } catch (error) {
            console.log('catch error client :: handleFilter');
        }
    }

    return (
        <>

            <div className='m-1 bg-gray-800 overflow-hidden flex flex-col rounded-lg pb-5'>

                {/* ONE_____________ */}
                <div className='p-5 w-full'>
                    <h1 className='mt-5 mb-2 text-4xl drop-shadow-md
                     text-white bold-text'>Filter The Novels</h1>
                </div>

                {/* TWO_____________ */}
                <div className='w-full p-2'>

                    <div className='flex flex-row gap-4 justify-center'>
                        {/* ----------------------GENRES----------------------------------------- */}
                        {
                            allGenre.map((item) => (
                                <div className="flex items-center mb-4 ">
                                    <input id={item.id} type="checkbox" value={item._id} name='genres'
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300" />

                                    <label className="ms-1.5 text-sm font-medium text-gray-900 
                                     dark:text-gray-300" >
                                        {item.name}
                                    </label>
                                </div>

                            ))
                        }

                    </div>

                    <hr className='border-red-500 border-2' />

                    <div className='sm:flex sm:gap-4 gap-2 grid grid-cols-1 p-3 justify-center font-mono'>
                        {/* ------------------------------STATUS---------------------- */}
                        <div>
                            <select id="status" className="bg-gray-50 border border-gray-300 text-gray-900
                             text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={null}>Status</option>
                                <option value={'completed'}>Completed</option>
                                <option value={'ongoing'}>Ongoing</option>
                                <option value={'canceled'}>Canceled</option>
                            </select>
                        </div>
                        {/* ------------------------------YEAR---------------------- */}
                        <div>
                            <select id="year" className="bg-gray-50 border border-gray-300 text-gray-900
                             text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={null}>Year</option>
                                <option value={2023}>2023</option>
                                <option value={2022}>2022</option>
                                <option value={2021}>2021</option>
                            </select>
                        </div>
                        {/* ------------------------------Sort---------------------- */}
                        <div>
                            <select id="sort" className="bg-gray-50 border border-gray-300 text-gray-900
                             text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block
                                p-2 w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                               dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value={null}>Sort</option>
                                <option value={"title"}>Name A-Z</option>
                                <option value={"updated_date"}>Recently updated</option>
                                <option value={"publish-date"}>Recently added</option>
                                <option value={"views"}>Most viewed</option>
                                <option value={"in_library"}>Trending</option>
                            </select>
                        </div>
                        {/* --------------------------FILTER BUTTON------------------------- */}
                        <div className='flex gap-2'>
                            <button className='bg-blue-500 p-1.5 text-white rounded-md pr-2 font-sans md:w-24 w-full'
                                onClick={handleFilter}>
                                <i className="fa-solid fa-circle-nodes ml-1 mr-1"></i>
                                Filter
                            </button>
                            <button className='bg-red-500 p-1.5 text-white rounded-md pr-2 font-sans md:w-24 w-full'
                                onClick={getAllNovels}>
                                <i class="fa-solid fa-retweet mr-1"></i>
                                Get All
                            </button>
                        </div>

                    </div>



                </div>


                {/* THREE_____________ */}
                {novels.length > 0 ? '' :
                    < h1 className='font-mono text-5xl text-white text-center mt-10 mb-4'>
                        - There is No Novels <i class="fa-regular fa-face-sad-tear "></i> -
                    </h1>
                }
                <div className='grid md:grid-cols-2 grid-cols-1 p-5 gap-2'>

                    {
                        novels.map((item, index) => (

                            <>
                                {/* -------------------NOVEL CARD---------------------------- */}
                                <div className='__CARD__  bg-gray-700 hover:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
                                 from-gray-600 via-gray-700 to-gray-800 lg:h-64 h-80 rounded-lg flex overflow-hidden
                                 '>

                                    <div className='w-1/2 hover:scale-105 duration-500'
                                        style={{
                                            backgroundImage: `url(${CoverUrl}/${item._id})`,
                                            backgroundSize: 'cover'
                                        }}></div>

                                    <div className='w-full pl-3 pr-3'>

                                        <div className='text-right'>
                                            <p className='text-white poppins text-right text-lg bg-red-500 
                                                inline drop-shadow-md p-2 rounded-b-lg'
                                            >3.4</p>
                                        </div>

                                        <div className='flex'>
                                            <p className='poppins text-white text-left text-xl'>{item.title}</p>
                                        </div>

                                        {/* GENRES-------------------------------- */}
                                        <div className='w-full grid lg:grid-flow-col gap-2 mt-2'>

                                            <small className='bg-blue-700 pr-2 pl-2 p-0.5 text-gray-200 
                                                    rounded-xl cursor-default font-mono'> Author: {item.author_id.userName} </small>

                                            {
                                                item.genre.map((genre) => (

                                                    <small className='bg-blue-500 pr-2 pl-2 p-0.5 text-gray-200 
                                                    rounded-xl cursor-default'> {genre.name} </small>
                                                ))
                                            }

                                        </div>

                                        {/* -------CHAPTERS----------------------- */}
                                        <div className='w-full flex flex-col gap-2 mt-6'>

                                            <div className='bg-gray-600 pr-3 pl-3 text-gray-300 
                                rounded-full cursor-default grid grid-cols-2'>
                                                <p className='text-start'>chapter 9</p>
                                                <p className='text-end'>23/09/44</p>
                                            </div>

                                            <div className='bg-gray-600 pr-3 pl-3 text-gray-300 
                                rounded-full cursor-default grid grid-cols-2'>
                                                <p className='text-start'>chapter 8</p>
                                                <p className='text-end'>07/06/44</p>
                                            </div>

                                            <div className='bg-gray-600 pr-3 pl-3 text-gray-300 
                                rounded-full cursor-default grid grid-cols-2'>
                                                <p className='text-start'>chapter 7</p>
                                                <p className='text-end'>02/05/44</p>
                                            </div>

                                            <div className='bg-gray-600 pr-3 pl-3 text-gray-300 
                                rounded-full cursor-default grid grid-cols-2'>
                                                <p className='text-start'>chapter 6</p>
                                                <p className='text-end'>23/03/43</p>
                                            </div>


                                        </div>

                                    </div>

                                </div>
                                {/* -------------------NOVEL CARD END---------------------------- */}
                            </>

                        ))
                    }






                </div>



            </div >

        </>
    )
}
