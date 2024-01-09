import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from '../../util/axios'
import toast from 'react-hot-toast';
import { AuthorAddChapterPost, AuthorNovelDetails, Signup } from '../../util/constants';
//.........................................................................


export default function AuthorCreate() {

    const navigate = useNavigate();
    const location = useLocation();

    //STATES...................................................................

    const [NovelId, setNovelId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState(``);

    //.........................................................................


    useEffect(() => {

        const user = JSON.parse(localStorage.getItem('user-login'))

        if (!user?.isAuthor) {

            navigate(Signup);

        } else {

            const queryParams = new URLSearchParams(location.search);
            const NovelIdQuery = queryParams.get('NovelId');

            if (!NovelIdQuery) {
                navigate(-1)
            } else {
                setNovelId(NovelIdQuery);
            }
        }

    }, [])

    //.........................................................................

    const handleSubmit = async (e) => {

        e.preventDefault();

        const queryParams = new URLSearchParams(location.search);
        const chapterNumber = queryParams.get('number');

        const body = JSON.stringify({
            NovelId,
            title,
            content,
            chapterNumber
        });

        let response = await axios.post(AuthorAddChapterPost, body, { headers: { "Content-Type": "application/json" } });

        if (response.data.status) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                navigate(`${AuthorNovelDetails}?NovelId=${NovelId}`, { replace: true })
            })


        } else {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: response.data.message,
                showConfirmButton: false,
                timer: 1500,
            })
        }
    }

    //.........................................................................

    return (
        <>
            <div className='m-2 md:m-2 bg-gray-600 p-9 hover:shadow-2xl'>

                <p className='poppins text-center text-gray-100 text-3xl mt-4 mb-1'>Add Chapter
                    <i class="fa-solid fa-book-open ml-2"></i>
                </p>

                <small className='poppins2 text-center text-gray-400 block'>
                    add the chapter for your novel, lets go...
                </small>

                <form className="bg-gray-600" onSubmit={handleSubmit}>

                    {/* ----------CHAPTER TITLE----------------------- */}
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-700
                         dark:text-white">Chapter Title</label>

                        <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-700
                                text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
                              dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            placeholder="title for the chapter"
                            onChange={e => setTitle(e.target.value)} required />
                    </div>
                    {/* ----------CHAPTER TITLE END----------------------- */}


                    {/* ----------CHAPTER MAIN CONTENT----------------------- */}
                    <div className="mb-5">
                        <label className="block mb-2 text-sm font-medium text-gray-700
                           dark:text-white">Chapter Content</label>
                        <textarea id="description" className="bg-gray-50 border border-gray-300 text-gray-700 
                        text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700
                         dark:border-gray-600 dark:placeholder-gray-400 dark:text-white h-56 novelFont"
                            placeholder="Write from Here Or Past Here"
                            onChange={e => setContent(e.target.value)} required />
                    </div>
                    {/* ----------CHAPTER MAIN CONTENT END----------------------- */}


                    {/* ----------BUTTONS----------------------- */}
                    <button type="submit" className="text-white bg-blue-500 hover:bg-blue-600 mt-14
                      focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5
                      py-2.5 text-center">Submit</button>

                    <button type="submit" className="text-white bg-red-500 hover:bg-red-600 mt-5
                      focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5
                      py-2.5 text-center"
                        onClick={() => navigate(`${AuthorNovelDetails}?NovelId=${NovelId}`, { replace: true })}>
                        Cancel
                    </button>
                    {/* ----------BUTTONS END----------------------- */}

                </form>

            </div >
        </>
    )
}
