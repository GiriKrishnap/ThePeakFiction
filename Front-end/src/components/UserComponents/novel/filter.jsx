import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoverUrl, novelDetailedView } from '../../../util/constants';
import { getAllGenresAPI, getAllNovelsForUsersAPI, getFilteredNovelsAPI } from '../../../APIs/userAPI';
//.........................................................................


export default function Banner() {


    //.........................................................................

    const navigate = useNavigate();

    //.........................................................................

    const [novels, setNovels] = useState([]);
    const [allGenre, setAllGenre] = useState([]);
    const [search, setSearch] = useState('');

    //.........................................................................

    useEffect(() => {
        getAllGenres();
        getAllNovels();
    }, [])

    //.........................................................................

    const getAllNovels = async () => {
        try {

            const response = await getAllNovelsForUsersAPI();
            if (response.data.status) {
                setNovels(response.data.novels)
            }

        } catch (error) {
            console.log(error)
        }
    }

    //.........................................................................

    const getAllGenres = async () => {
        try {

            const response = await getAllGenresAPI();

            if (response.data.status) {

                setAllGenre(response.data.genres)
                allGenre.sort()

            } else {
                console.log('backend Problem ::getAllGenres');
            }

        } catch (error) {
            console.log("error in getGenres function client side");
        }
    }

    //.........................................................................

    const handleFilter = async () => {
        try {
            
            var checkboxes = document.getElementsByName("genres");
            var selectedGenres = [];

            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedGenres.push(checkboxes[i].value);
                }
            }

            const selectedStatus = document.getElementById("status").value;
            const selectedYear = document.getElementById("year").value;
            const selectedSort = document.getElementById("sort").value;

            const body = JSON.stringify({
                selectedGenres,
                selectedStatus,
                selectedYear,
                selectedSort,
                search
            })

            const response = await getFilteredNovelsAPI(body);

            if (response.data.status) {
                setNovels(response.data.novels);
            }

        } catch (error) {
            console.log('catch error client :: handleFilter');
        }
    }

    //.........................................................................

    const handleClick = async (novelId) => {

        navigate(`${novelDetailedView}?NovelId=${novelId}`, { replace: true });

    }

    //.........................................................................

    return (
        <>

            <div className='m-1 bg-gray-800 overflow-hidden flex flex-col rounded-lg pb-5 text-center'>

                {/* ONE_____________ */}
                <div className='p-5 w-full'>
                    <h1 className='mt-5 mb-2 text-4xl drop-shadow-md
                     text-white bold-text'>Filter The Novels</h1>
                    <small className='text-gray-400'>Effortlessly discover and savor captivating novels
                        with ease through efficient filtering, enabling a delightful reading experience.</small>
                </div>

                {/* TWO_____________ */}
                <div className='w-full p-2 mt-3'>

                    <div className='flex flex-row gap-4 justify-center'>
                        {/* ----------------------GENRES----------------------------------------- */}
                        {
                            allGenre.map((item) => (
                                <div key={item._id}
                                    className="flex items-center mb-4 ">
                                    <input id={item._id} type="checkbox" value={item._id} name='genres'
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
                                <option value={''}>Status</option>
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
                                <option value={''}>Year</option>
                                <option value={2024}>2024</option>
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
                                <option value={"views"}>Most viewed</option>
                                <option value={"title"}>Name A-Z</option>
                                <option value={"updated_date"}>Recently updated</option>
                                <option value={"publish-date"}>Recently added</option>
                                <option value={"in_library"}>Trending</option>
                            </select>
                        </div>
                        {/* ---------------------------SEARCH NOVELS------------------------ */}
                        <div>
                            <input type='text' className="bg-gray-500 border-0 text-white
                             text-sm rounded-lg block p-2 pl-3 w-full" placeholder='Search'
                                onChange={(e) => setSearch(e.target.value)} />
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
                                <i className="fa-solid fa-retweet mr-1"></i>
                                Get All
                            </button>
                        </div>

                    </div>



                </div>


                {/* THREE_____________ */}
                {novels.length > 0 ? '' :
                    < h1 className='font-mono text-5xl text-white text-center mt-10 mb-4'>
                        - There is No Novels <i className="fa-regular fa-face-sad-tear "></i> -
                    </h1>
                }
                <div className='grid md:grid-cols-2 grid-cols-1 p-5 gap-2'>

                    {
                        novels.map((item, index) => (

                            <div key={item._id}>
                                {/* -------------------NOVEL CARD---------------------------- */}
                                <div
                                    className='__CARD__  bg-gray-700 hover:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]
                                 from-gray-600 via-gray-700 to-gray-800 lg:h-64 h-80 rounded-lg flex overflow-hidden'
                                    onClick={() => handleClick(item._id)}>

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



                                    </div>

                                </div>
                                {/* -------------------NOVEL CARD END---------------------------- */}
                            </div>

                        ))
                    }






                </div>



            </div >

        </>
    )
}
//.........................................................................

