import axios from '../../../util/axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthorAddChapter, CoverUrl, getNovelDetailsWithId } from '../../../util/constants';
//.........................................................................

export default function WalletComponent() {

    //.........................................................................

    const location = useLocation();
    const navigate = useNavigate();

    //.........................................................................


    //.........................................................................

    return (

        <>
            <div className='bg-gray-800 rounded-3xl drop-shadow-md'>

                <div className='bg-blue-500 hover:bg-blue-600 w-96 p-6 rounded-3xl
                 flex flex-col justify-center place-items-center gap-2 drop-shadow-md'>
                    <small className='poppins2'>Total Balance</small>
                    <p className='poppins2 text-4xl font-bold'>
                        <i class="fa-solid fa-indian-rupee-sign"></i> 200</p>
                </div>

                <div className='p-10 text-2xl flex justify-center gap-10'>

                    <i class="fa-solid fa-square-plus fa-2xl drop-shadow-md hover:scale-105
                     duration-200 hover:-rotate-6 hover:text-gray-600"></i>
                    <i class="fa-solid fa-list-ol fa-2xl drop-shadow-md hover:scale-105
                     duration-200 hover:rotate-6 hover:text-gray-600"></i>
                </div>

            </div>
        </>
    )
}
//.........................................................................
