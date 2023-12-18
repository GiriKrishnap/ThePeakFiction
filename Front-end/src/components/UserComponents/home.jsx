import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../../util/axios2'
import { useDispatch } from 'react-redux';
import { Login, authorHome, verifyUserToken } from '../../util/constants';

const bannerUrl = `trending/all/week?api_key=72113855b6b9b2c9a0021aa88a253c45&language=en-US`
const imageUrl = "https://image.tmdb.org/t/p/original"

export default function Header() {

    const navigate = useNavigate();
    const [banner, setBanner] = useState([]);
    console.log(banner)

    useEffect(() => {
        changeBanner()
    }, [])

    const changeBanner = async () => {
        const randomDigit = Math.floor(Math.random() * 20);
        axios.get(bannerUrl).then((response) => {
            setBanner(response.data.results[randomDigit])
        })
    }

    return (
        <>

            <div className='md:h-72 h-56 m-2 rounded-lg flex'
                style={{ backgroundImage: `url(${imageUrl + banner.poster_path})`, backgroundSize: 'cover' }}>
                <div className='h-full pl-5 flex flex-col place-items-start text-left bg-gradient-to-r from-gray-800 from-50% to-transparent to-95% rounded-lg p-4'>

                    <p className='md:text-7xl text-4xl m-1  md:mt-8 mt-8 font-medium 
                    bold-text text-white drop-shadow-md hover:tracking-wide hover:ml-10 duration-1000 '>{banner.original_title}
                    </p>

                    <p className='text-gray-200 mt-3 italic md:h-full h-14 overflow-hidden poppins drop-shadow-lg hidden lg:block'>
                        {banner.overview}
                    </p>
                    <div className='flex mt-3 md:hidden '>
                        <button className=' bg-red-500 h-8 text-center w-20 rounded-lg text-white 
                        font-medium mr-2 drop-shadow-lg hover:scale-105 hover:bg-red-600 duration-500'>Read</button>
                        <button className=' bg-blue-500 h-8 w-20 rounded-lg
                         text-white font-medium drop-shadow-lg hover:scale-105
                         text-sm hover:bg-blue-600 duration-500'>+library</button>
                    </div>
                </div>

                <img src={`${imageUrl + banner.poster_path}`} alt="img" className='md:h-64 h-44 m-4 rounded-lg drop-shadow-2xl -rotate-6 
                hover:rotate-0 hover:scale-95 duration-500 ' />

                <div className='p-10 hidden lg:block mt-10 '>
                    <p className='flex text-blue-400 poppins drop-shadow-sm font-bold text-2xl tracking-wider'>Author: {banner.media_type} </p>
                    <p className='flex text-blue-400 poppins drop-shadow-sm font-bold text-2xl tracking-wider'>Publish Date: {banner.release_date}</p>
                    <p className='flex text-blue-400 poppins drop-shadow-sm font-bold text-2xl tracking-wider'>Rating: {banner.vote_average}</p>
                    <br />

                    <div className='flex mt-3'>
                        <button className=' bg-red-500 h-10 p-2 w-52 rounded-full text-white 
                        font-medium mr-2 drop-shadow-lg hover:scale-105 hover:ml-1 hover:bg-red-600 duration-500'>Read Now</button>
                        <button className=' bg-blue-500 h-10 p-2 w-52 rounded-full
                         text-white font-medium drop-shadow-lg hover:scale-105 hover:ml-1 hover:bg-blue-600 duration-500'>Add to library</button>
                        <i class="fa-solid fa-retweet text-white fa-xl mt-5 cursor-pointer m-2" onClick={changeBanner}></i>
                    </div>
                </div>
            </div>

        </>
    )
}
