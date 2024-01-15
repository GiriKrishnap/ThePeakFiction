import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { addNovelToLibraryAPI, getRandomNovelAPI } from '../../../APIs/userAPI';
import { CoverUrl, novelDetailedView } from '../../../util/constants';
import toast from 'react-hot-toast';
//.........................................................................


export default function Chat() {

    //.........................................................................

    const navigate = useNavigate();

    //.........................................................................








    //.........................................................................

    return (
        <>

            <div className='bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
            from-gray-600 via-gray-700 to-gray-800 poppins2 p-10 m-1 rounded-lg text-white'>

                {/* ................JOIN A ROOM.................... */}
                <div className='flex gap-3 justify-center mt-20'>

                    <input type="text" className='pl-3 rounded drop-shadow-lg w-96 bg-gray-200'
                        placeholder='enter the community id' />

                    <button className='bg-blue-500 p-1 pr-4 pl-4 rounded'>
                        Join <i className="fa-solid fa-right-to-bracket drop-shadow-lg"></i>
                    </button>
                </div>

                <div className='max-h-screen m-10 pt-5 overflow-y-scroll'>

                    <p className='text-center font-mono text-xl'>All Joined Community</p>
                    <div className='w-full h-full mt-5 p-2'>

                        <div className='h-20 bg-gray-600 rounded-2xl mb-3 flex overflow-hidden'>
                            <img src="https://picsum.photos/200/300" alt='img'
                                className='w-24 rounded-r-full shadow-xl' />
                            <div className='flex flex-col place-content-center ml-2'>
                                <p className='text-2xl'>Spy x Family Community</p>
                                <p className='font-mono text-gray-300'>John:hello there</p>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

        </>
    )
}
//............................................................................
