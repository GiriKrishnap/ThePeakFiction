import { useEffect, useState } from 'react'
import axios from '../../../util/axios'
import { CoverUrl, getMostViewed } from '../../../util/constants';


export default function RowPost() {

    const [novels, setNovels] = useState([]);

    useEffect(() => {
        getMostViewedNovels()

    }, [])

    const getMostViewedNovels = async () => {
        axios.get(getMostViewed).then((response) => {
            if (response.data.status) {
                setNovels(response.data.most)
            }
        }).catch(err => console.log('error on getMostViewedNovels => ' + err))
    }

    return (
        <>
            <div className='p-2 bg-slate-900'>
                <p className='text-white poppins text-4xl text-left mb-1 mt-2'>MOST VIEWED</p>

                <div className='p-2 grid xl:grid-cols-6 md:grid-cols-4 sm:grid-cols-4 grid-cols-2  gap-3'>

                    {
                        novels.map((novel, index) => (

                            <div className='bg-blue-500 h-60 rounded-md
                    hover:m-1 hover:scale-105 duration-200 overflow-hidden'
                                key={novel._id}
                                style={{
                                    backgroundImage: `url(${CoverUrl}/${novel._id})`,
                                    backgroundSize: 'cover'
                                }}>

                                <div className=' w-full h-full p-2 bg-gradient-to-t from-gray-700 to-transparent
                                 to-90% rounded-md'>

                                    <div className='text-right'>
                                        <p className='text-white poppins text-right text-3xl bg-blue-600 
                                                inline mr-2 drop-shadow-md p-2 rounded-lg'
                                        > {index + 1} </p>
                                    </div>

                                    <p className='text-white poppins text-lg
                                     drop-shadow-md mt-28'
                                    >{novel.title}</p>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>
        </>
    )
}
