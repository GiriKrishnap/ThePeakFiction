import axios from '../../util/axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { CoverUrl, getNovelDetailsWithId } from '../../util/constants';
//.........................................................................


let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

export default function NovelDetailedView() {

    //.........................................................................

    const location = useLocation();
    const navigate = useNavigate();

    //.........................................................................

    const [novel, setNovel] = useState([]);

    //.........................................................................

    useEffect(() => {

        const queryParams = new URLSearchParams(location.search);
        const NovelId = queryParams.get('NovelId');

        if (!NovelId) {
            navigate(-1)
        } else {
            getNovelWithId(NovelId);
        }
    }, [])

    //.........................................................................

    const getNovelWithId = async (novelId) => {
        try {

            axios.get(`${getNovelDetailsWithId}/${novelId}`).then((response) => {
                setNovel([response.data.novel]);
            })
        } catch (error) {
            console.log('catch error in ::getNovelWithId - ' + error.message)
        }
    }

    //.........................................................................


    return (

        <>{

            novel.map((item) => (



                < div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
            from-gray-600 via-gray-700 to-gray-800 m-1 p-2'>

                    {/*--------------------- NOVEL DETAILS -----------------*/}
                    <div className='m-3 p-1 sm:flex-row flex flex-col gap-5'>

                        <div className='sm:w-4/6 sm:flex-row flex flex-col gap-5'>

                            {/* ------------ NOVEL COVER DIV ------------- */}
                            <div className='sm:w-2/6 h-full flex justify-center items-center'>

                                <div className='h-80 w-60 bg-black rounded-lg text-white
                        drop-shadow-lg hover:border-4 border-blue-500 hover:rotate-2 duration-200'
                                    style={{
                                        backgroundImage: `url(${CoverUrl}/${item._id})`,
                                        backgroundSize: 'cover'
                                    }}></div>

                            </div>
                            {/* ------------ NOVEL COVER DIV END ------------- */}

                            {/* ------------ NOVEL NAME AND DESCRIPTION ------------- */}
                            <div className='sm:w-4/6 h-full flex flex-col justify-center'>
                                <h1 className='text-white poppins2 text-3xl'>{item.title}</h1>
                                <p className='text-blue-400 font-mono tracking-widest'>{item.status}</p>

                                {/* READ NOW AND ADD TO LIBRARY BUTTONS */}
                                <div className='md:w-3/4 flex gap-2 mt-3 w-full'>

                                    <button className='bg-blue-500 hover:bg-gray-500 poppins2 p-1.5
                             text-white rounded-md pr-2 font-sans w-full drop-shadow-lg'>
                                        Read Now
                                        <i class="fa-solid fa-caret-right m-1.5"></i>
                                    </button>

                                    <button className='bg-gray-700 hover:bg-blue-700 poppins2 p-1.5
                             text-white rounded-md pr-2 font-sans w-full drop-shadow-lg'>
                                        Add To Library
                                        <i class="fa-solid fa-circle-plus m-1.5"></i>
                                    </button>

                                </div>
                                {/* READ NOW AND ADD TO LIBRARY BUTTONS END*/}


                                {/* NOVEL VIEWS AND LIBRARY COUNT */}
                                <div className='w-3/4 flex gap-5 ml-4 mt-3'>

                                    <small className='text-gray-300'>Views {item.views} <i class="fa-solid fa-eye"></i></small>
                                    <small className='text-gray-300'>|</small>
                                    <small className='text-gray-300'>in {item.in_library} Library <i class="fa-solid fa-book-bookmark"></i></small>

                                </div>
                                {/* NOVEL VIEWS AND LIBRARY COUNT END*/}


                                {/* NOVEL DESCRIPTION */}
                                <div className='w-full text-gray-200 overflow-hidden mt-3 p-1'>

                                    <p> {item.description} </p>

                                </div>
                                {/* NOVEL DESCRIPTION END*/}

                            </div>
                            {/* ------------ NOVEL NAME AND DESCRIPTION END------------- */}

                        </div>

                        {/* ------------ NOVEL REVIEW AND DETAILS ------------- */}
                        <div className='sm:w-2/6 flex flex-col pl-12 justify-center
                                    text-white text-left font-mono'>
                            <p><b className='font-sans'>Author:</b> {item.author_id.userName}</p>
                            <p><b className='font-sans'>Publish Date:</b> {new Date(item.publish_date).toLocaleDateString("en-GB")}</p>
                            <p><b className='font-sans'>Genres:</b> {
                                item.genre.map((genres) => (
                                    genres.name + ', '
                                ))
                            }</p>

                            {/* RATING SYSTEM */}
                            <div class="flex items-center  ">
                                <div className='bg-gray-800 flex p-3 pl-6 pr-6 mt-3 rounded-lg'>
                                    <p class="ms-1 text-md font-medium text-gray-500 dark:text-gray-400">4.95</p>
                                    <p class="ms-1 text-md font-medium text-gray-500 dark:text-gray-400">out of</p>
                                    <p class="ms-1 text-md font-medium text-gray-500 dark:text-gray-400 mr-3">5</p>

                                    <svg class="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg class="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg class="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg class="w-6 h-6 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                    <svg class="w-6 h-6 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                </div>
                            </div>
                            {/* RATING SYSTEM END*/}

                        </div>
                        {/* ------------ NOVEL REVIEW AND DETAILS END ------------- */}

                    </div>
                    {/*--------------------- NOVEL DETAILS END-----------------*/}

                    {/* -----------------------NOVEL CHAPTERS-------------------- */}
                    <div className='w-full max-h-96 flex flex-col-reverse gap-3 p-5 mt-10 overflow-y-scroll scroll'>
                        {
                            item.chapters?.length > 0 ?
                                item.chapters.map((chapter) => (

                                    <div className={`hover:bg-gray-500 ${chapter.gcoin > 0 ? "bg-gray-900" : 'bg-gray-600'} w-full rounded-lg
                                         p-2 pl-5 pr-5 grid grid-cols-3 lg:grid-cols-4 font-medium poppins2 ${chapter.gcoin > 0 ? "text-white" : 'text-gray-400'}
                                          hover:text-white gap-5 hover:font-mono select-none cursor-pointer`}>

                                        <p className='text-left text-sm lg:text-lg lg:col-span-2'>chapter {chapter.number}: {chapter.title}</p>

                                        {
                                            <p className='text-center text-sm lg:text-lg'>{chapter.gcoin ?
                                                `${chapter.gcoin} Gcoin to unlock` : ''}</p>
                                        }

                                        <p className='text-right text-sm lg:text-lg'>
                                            {new Date(chapter.publish_date).toLocaleDateString("en-GB")}
                                        </p>

                                    </div>

                                )) : <p className='text-white text-center bg-blue-500 p-2 
                                            rounded font-mono'>There is Chapters</p>
                        }

                    </div>
                    {/* -----------------------NOVEL CHAPTERS END-------------------- */}

                    <div className='w-full max-h-96 flex flex-col gap-3 p-5 mt-10 overflow-y-scroll scroll'>

                    </div>

                </div >

            ))

        }</>
    )
}
//.........................................................................
