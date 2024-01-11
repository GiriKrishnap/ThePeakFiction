import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { novelDetailedView, readNovel } from '../../../util/constants';
import Comments from '../../Comments/comments';
import { getNovelDetailsWithIdAPI } from '../../../APIs/userAPI';
import toast from 'react-hot-toast';
//.........................................................................


export default function ReadNovel() {

    //.........................................................................

    const location = useLocation();
    const navigate = useNavigate();

    //.........................................................................

    const [darkMode, setDarkMode] = useState(true);
    const [novel, setNovel] = useState([]);
    const [chapterNumber, setChapterNumber] = useState([]);

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

            const response = await getNovelDetailsWithIdAPI(novelId);

            if (response.data.status) {

                setNovel([response.data.novel]);
            }

            const queryParams = new URLSearchParams(location.search);
            const Number = queryParams.get('number');
            setChapterNumber(Number - 1)

        } catch (error) {
            console.log('catch error in ::getNovelWithId - ' + error.message)
            toast.error(error.message);

        }
    }

    //.........................................................................

    const handleNextAndPrevious = async (novelId, chapter) => {

        navigate(`${readNovel}?NovelId=${novelId}&number=${chapter + 1}`)
        setChapterNumber(chapter)

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });

    }

    //.........................................................................

    const handleHomeBtn = async (novelId) => {

        navigate(`${novelDetailedView}?NovelId=${novelId}`);
    }

    //.........................................................................

    return (
        <>
            {/* ---------------CHAPTER TITLE , DARK MODE----------------- */}
            <div className={`${darkMode ? "bg-slate-700 text-white" : "bg-gray-200 text-black"} " 
             flex flex-col mb-1  "`}>

                <div className={`${darkMode ? "bg-gray-800 " : "bg-gray-300 "} " 
                "bg-black h-24 w-full grid rounded-b-3xl grid-cols-4  "`}>

                    <div className='bold-text flex flex-col justify-center pl-10 tracking-wide col-span-3'>

                        <small> <i class="fa-solid fa-book"></i> {novel[0]?.title}</small>
                        <p className='md:text-2xl text-lg'>Chapter {novel[0]?.chapters[chapterNumber]?.number} : {
                            novel[0]?.chapters[chapterNumber].title}</p>

                    </div>

                    <div className='flex flex-col justify-center pr-10 text-right'>
                        <p onClick={() => setDarkMode(!darkMode)}>
                            {
                                darkMode ?
                                    <i class="fa-solid fa-2xl fa-moon"></i> :
                                    <i class="fa-solid fa-2xl fa-sun"></i>
                            }
                        </p>
                    </div>

                </div>
                {/* --------------------CHAPTER TITLE , DARK MODE END---------------- */}


                {/* --------------------------CONTENT------------------------------ */}
                <div className='w-full p-10 text-xl novelFont'>
                    <p style={{ whiteSpace: 'pre-wrap' }}>
                        {novel[0]?.chapters[chapterNumber]?.content}
                    </p>

                </div>
                {/* --------------------------CONTENT END------------------------------ */}



                {/* --------------------------BUTTONS------------------------------ */}
                <div className='w-full p-5 text-xl novelFont flex gap-2 justify-center text-white'>

                    {
                        novel[0]?.chapters[chapterNumber - 1]?.content ?
                            <button className='bg-blue-600 w-32 p-2 rounded-lg hover:bg-blue-800'
                                onClick={() => handleNextAndPrevious(novel[0]._id, chapterNumber - 1)}>
                                <i class="fa-solid fa-angle-left"></i> Previous
                            </button> : ''
                    }


                    <button className='bg-gray-600 p-2 w-32 rounded-lg hover:bg-gray-800'
                        onClick={() => handleHomeBtn(novel[0]._id)}>
                        Home <i class="fa-solid fa-house"></i>
                    </button>

                    {
                        novel[0]?.chapters[chapterNumber + 1]?.content ?
                            <button className='bg-blue-600 p-2 w-32 rounded-lg hover:bg-blue-800'
                                onClick={() => handleNextAndPrevious(novel[0]._id, chapterNumber + 1)}>
                                Next <i class="fa-solid fa-angle-right"></i>
                            </button> : ''
                    }

                </div>
                {/* --------------------------BUTTONS END------------------------------ */}


            </div >

            <div className='bg-gray-700 p-5 mt-1 mb-1 text-white text-2xl font-mono'>
                <Comments novelId={novel[0]?._id} chapterNo={chapterNumber + 1} />
            </div>

        </>
    )
}

//.........................................................................
