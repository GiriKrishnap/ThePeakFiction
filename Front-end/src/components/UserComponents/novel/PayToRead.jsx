
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { } from '../../../APIs/userAPI';
import toast from 'react-hot-toast';
//.........................................................................


export default function PayToRead() {

    //.........................................................................

    const navigate = useNavigate();
    const location = useLocation();

    //.........................................................................

    const [novelId, setNovelId] = useState('');
    const [chapterId, setChapterId] = useState('');
    const [password, setPassword] = useState('');

    //.........................................................................

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user-login')).id;

        const queryParams = new URLSearchParams(location.search);
        const NovelIdQuery = queryParams.get('NovelId');
        const ChapterIdQuery = queryParams.get('ChapterId');

        if (!NovelIdQuery || !ChapterIdQuery) {
            navigate(-1)
        } else {
            setNovelId(NovelIdQuery);
            setChapterId(ChapterIdQuery);
        }

    }, [])
    //.........................................................................



    //.........................................................................


    const handleSubmit = async (e) => {
        try {



        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    //.........................................................................

    return (
        <>

            <div className='h-screen flex justify-center place-items-center text-black select-none'>

                <div className='md:w-1/2 w-full m-10 h-1/2 bg-white rounded-2xl drop-shadow-xl 
                      flex flex-col justify-center place-items-center md:p-40 p-20 hover:shadow-2xl '>

                    <p className='poppins2 font-bold md:text-4xl text-2xl'>
                        Pay - to - Read
                    </p>

                    <small className='text-gray-400 mt-2 font-mono'>
                        pay to read this chapter
                    </small>

                    <p className='text-3xl p-1 m-5 text-white font-bold bg-gray-400 
                    w-full text-center rounded-2xl shadow-sm'>
                        10$
                    </p>

                    <input type="password" name="password" className='w-full p-2 rounded-xl bg-gray-200
                    focus:bg-gray-600 focus:text-white tracking-widest text-center poppins2 font-extrabold
                    focus:shadow-xl'
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)} value={password} maxLength={8}
                        required autoComplete='false' />

                    <button className='w-full p-2 mt-4 bg-blue-400 text-white
                        rounded-xl hover:bg-blue-600 hover:shadow-xl' onClick={handleSubmit}>
                        Confirm
                    </button>

                </div>

            </div>

        </>
    )
}
//.........................................................................
