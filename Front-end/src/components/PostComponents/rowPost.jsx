import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { CoverUrl, novelDetailedView } from '../../util/constants';
import { getMostViewedNovelsAPI } from '../../APIs/userAPI';
import toast from 'react-hot-toast';
//.........................................................................


export default function RowPost({ axiosUrl, limit = Infinity, title }) {

    //.........................................................................

    const navigate = useNavigate();

    //.........................................................................

    const [novels, setNovels] = useState([]);

    //.........................................................................

    useEffect(() => {
        getMostViewedNovels()
    }, [])

    //.........................................................................

    const getMostViewedNovels = async () => {
        try {

            const response = await getMostViewedNovelsAPI(axiosUrl);

            if (response.data.status) {
                setNovels(response.data.novels.slice(0, limit));
            }

        } catch (error) {
            console.log('error on getMostViewedNovels => ' + error);
            toast.error(error.message);
            
        }
    }

    //.........................................................................

    const handleClick = async (novelId) => {

        navigate(`${novelDetailedView}?NovelId=${novelId}`, { replace: true });

    }

    //.........................................................................

    return (
        <>{
            novels ?
                <div className='p-2 bg-slate-900 pb-10 pt-5'>

                    <p className='text-white poppins text-4xl text-left mb-1 mt-2'>{title}</p>

                    <div className='p-2 grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-4 grid-cols-2  gap-3'>

                        {
                            novels.map((novel, index) => (

                                <div className='bg-blue-500 h-60 rounded-md
                                    hover:m-1 hover:scale-105 duration-200 overflow-hidden'
                                    key={novel._id}
                                    style={{
                                        backgroundImage: `url(${CoverUrl}/${novel._id})`,
                                        backgroundSize: 'cover'
                                    }}
                                    onClick={() => handleClick(novel._id)}>

                                    <div className=' w-full h-full p-2 bg-gradient-to-t from-gray-700 to-transparent
                                                     to-90% rounded-md'>

                                        <div className='text-right'>

                                            <p className='text-white poppins text-right text-3xl bg-blue-600 
                                                            inline mr-2 drop-shadow-md p-2 rounded-lg'>

                                                {index + 1}

                                            </p>

                                        </div>

                                        <p className='text-white poppins text-lg
                                                     drop-shadow-md mt-28 text-center'>
                                            {novel.title}
                                        </p>

                                    </div>

                                </div>
                            ))
                        }

                    </div>
                </div> : ''
        }
        </>
    )
}
//.........................................................................
