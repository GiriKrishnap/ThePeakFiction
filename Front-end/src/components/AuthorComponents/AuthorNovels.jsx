import { useEffect, useState } from 'react'
import { CoverUrl, Signup, authorNovelDetailed } from '../../util/constants';
import { useNavigate } from 'react-router-dom'
import { getAuthorNovelsAPI } from '../../APIs/userAPI';
import toast from 'react-hot-toast';
import { Pagination } from '@mui/material';

export default function AuthorNovels() {

    const navigate = useNavigate();

    const [novels, setNovels] = useState([]);
    const [currNovels, SetCurrNovels] = useState([]);
    const [pageNumber, setPageNumber] = useState([]);

    //.........................................................................

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user-login'))

        if (!user?.isAuthor) {
            navigate(Signup);
        } else {
            getAllNovels();
        }

    }, [])
    //.........................................................................

    const handleClick = async (novelId) => {

        navigate(`${authorNovelDetailed}?NovelId=${novelId}`, { replace: true });

    }

    //.........................................................................

    const getAllNovels = async () => {
        try {

            const response = await getAuthorNovelsAPI();

            if (response.data.status) {
                setNovels(response.data.novels)
                SetCurrNovels(response.data.novels.slice(0, 6))
                setPageNumber(Math.ceil(response.data.novels.length / 6))
            }

        } catch (error) {
            console.log(error.message);
            toast.error(error.message);
        }
    }

    //.........................................................................

    const [currPage, setCurrPage] = useState(1);

    const handleChange = (event, value) => {

        SetCurrNovels(novels.slice((value - 1) * 6, value * 6))
        setCurrPage(value);

    };

    //.........................................................................

    return (
        <>

            <div className='m-1 bg-gray-800 overflow-hidden flex flex-col rounded-lg pb-5 text-center'>

                {/* ONE_____________ */}
                <div className='p-5 w-full'>
                    <h1 className='mt-5 mb-2 text-4xl drop-shadow-md
                     text-white bold-text'>My Novels.</h1>
                    <small className='text-gray-400'>Here Your The Novels That Made By You. : )</small>
                </div>


                {/* THREE_____________ */}
                {currNovels.length > 0 ? '' :
                    < h1 className='font-mono text-5xl text-white text-center mt-20 mb-16'>
                        - There is No Novels <i className="fa-regular fa-face-sad-tear mt-1"></i> -
                    </h1>
                }
                <div className='grid md:grid-cols-2 grid-cols-1 p-5 gap-2'>

                    {
                        currNovels.map((item, index) => (

                            <div key={item._id}>
                                {/* -------------------NOVEL CARD---------------------------- */}
                                <div
                                    className='__CARD__  bg-gray-700 hover:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
                                 from-gray-600 via-gray-700 to-gray-800 lg:h-64 h-80 rounded-lg flex overflow-hidden'
                                    onClick={() => handleClick(item._id)}
                                >

                                    <div className='w-1/2 hover:scale-105 duration-500'
                                        style={{
                                            backgroundImage: `url(${CoverUrl}/${item._id})`,
                                            backgroundSize: 'cover'
                                        }}></div>

                                    <div className='w-full pl-3 pr-3'>

                                        <div className='text-right'>
                                            <p className='text-white poppins text-right text-lg bg-red-500 
                                                inline drop-shadow-md p-2 rounded-b-lg'
                                            >{item.rate}</p>
                                        </div>

                                        <div className='flex'>
                                            <p className='poppins text-white text-left text-xl'>{item.title}</p>
                                        </div>

                                        {/* GENRES-------------------------------- */}
                                        <div className='w-full grid lg:grid-flow-col gap-2 mt-2'>

                                            {
                                                item.genre.map((genre) => (

                                                    <small key={genre.name}
                                                        className='bg-blue-500 pr-2 pl-2 p-0.5 text-gray-200 
                                                    rounded-xl cursor-default'> {genre.name} </small>
                                                ))
                                            }

                                        </div>

                                        {/* -------CHAPTERS----------------------- */}
                                        <div className='w-full flex flex-col gap-2 mt-6'>

                                            {
                                                item.chapters[item.chapters.length - 1]?.title ?
                                                    < div className='bg-gray-600 pr-3 pl-3 text-gray-300 
                                                rounded-full cursor-default grid grid-cols-2'>
                                                        <p className='text-start'>
                                                            chapter {item.chapters[item.chapters.length - 1]?.number}
                                                        </p>
                                                        <p className='text-end'>
                                                            {new Date(item.chapters[item.chapters.length - 1]?.publish_date)
                                                                .toLocaleDateString("en-GB")}
                                                        </p>
                                                    </div> : ''

                                            }

                                            {
                                                item.chapters[item.chapters.length - 2]?.title ?
                                                    < div className='bg-gray-600 pr-3 pl-3 text-gray-300 
                                                rounded-full cursor-default grid grid-cols-2'>
                                                        <p className='text-start'>
                                                            chapter {item.chapters[item.chapters.length - 2]?.number}
                                                        </p>
                                                        <p className='text-end'>
                                                            {new Date(item.chapters[item.chapters.length - 2]?.publish_date)
                                                                .toLocaleDateString("en-GB")}
                                                        </p>
                                                    </div> : ''

                                            }

                                            {
                                                item.chapters[item.chapters.length - 3]?.title ?
                                                    < div className='bg-gray-600 pr-3 pl-3 text-gray-300 
                                                rounded-full cursor-default grid grid-cols-2'>
                                                        <p className='text-start'>
                                                            chapter {item.chapters[item.chapters.length - 3]?.number}
                                                        </p>
                                                        <p className='text-end'>
                                                            {new Date(item.chapters[item.chapters.length - 3]?.publish_date)
                                                                .toLocaleDateString("en-GB")}
                                                        </p>
                                                    </div> : ''

                                            }

                                            {
                                                item.chapters[item.chapters.length - 4]?.title ?
                                                    < div className='bg-gray-600 pr-3 pl-3 text-gray-300 
                                                rounded-full cursor-default grid grid-cols-2'>
                                                        <p className='text-start'>
                                                            chapter {item.chapters[item.chapters.length - 4]?.number}
                                                        </p>
                                                        <p className='text-end'>
                                                            {new Date(item.chapters[item.chapters.length - 4]?.publish_date)
                                                                .toLocaleDateString("en-GB")}
                                                        </p>
                                                    </div> : ''

                                            }



                                        </div>
                                        {/* -------CHAPTERS END----------------------- */}


                                        {
                                            item.chapters.length <= 0 ?
                                                < div className='bg-gray-600 text-gray-300 
                                                rounded-3xl cursor-default font-mono h-full p-10'>
                                                    <p className='text-center'>
                                                        no chapters yet..
                                                    </p>
                                                </div> : ''

                                        }
                                    </div>

                                </div>
                                {/* -------------------NOVEL CARD END---------------------------- */}
                            </div>

                        ))
                    }

                </div>

                <div className='bg-gray-800 justify-center flex p-3'>

                    <Pagination count={pageNumber} page={currPage} siblingCount={2} color="primary" size='large'
                        onChange={handleChange} />

                </div>

            </div >




        </>
    )
}
