import { useEffect, useState } from 'react'
import axios from '../../../util/axios'
import { CoverUrl, getMostViewed, getRandom } from '../../../util/constants';


export default function Banner() {

    const [novel, setNovel] = useState([]);
    useEffect(() => {
        changeBanner()
    }, [])

    const changeBanner = async () => {
        try {
            const response = await axios.get(getRandom)
            if (response.data.status) {
                setNovel(response.data.random[0])
                console.log(response.data.random[0])
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>

            <div className='md:h-72 h-56 m-2 rounded-lg grid md:grid-cols-3 grid-cols-2'
                style={novel._id ? { backgroundImage: `url(${CoverUrl}/${novel._id})`, backgroundSize: 'cover' } : {}}
            >
                {/* //////////////// */}
                <div className='h-full pl-5 flex flex-col place-items-start text-left bg-gradient-to-r
                 from-gray-800 from-50% to-transparent to-95% rounded-lg p-4'>

                    <p className='md:text-7xl text-4xl m-1  md:mt-8 mt-8 font-medium 
                    bold-text text-white drop-shadow-md hover:tracking-wide hover:ml-10 duration-1000 '>{novel.title}
                    </p>

                    <p className='text-gray-200 mt-3 italic md:h-36 h-full overflow-hidden 
                    poppins drop-shadow-lg hidden lg:block w-full'>
                        {novel.description}
                    </p>
                    <div className='flex mt-3 md:hidden '>
                        <button className=' bg-red-500 h-8 text-center w-20 rounded-lg text-white 
                        font-medium mr-2 drop-shadow-lg hover:scale-105 hover:bg-red-600 duration-500'>Read</button>
                        <button className=' bg-blue-500 h-8 w-20 rounded-lg
                         text-white font-medium drop-shadow-lg hover:scale-105
                         text-sm hover:bg-blue-600 duration-500'>+library</button>
                    </div>
                </div>

                {/* //////////////// */}
                {
                    novel._id ?
                        <div
                            style={{ backgroundImage: `url(${CoverUrl}/${novel._id})`, backgroundSize: 'cover' }}
                            className='md:h-64 h-44 m-4 rounded-lg drop-shadow-2xl -rotate-6 bg-black md:w-44
                        hover:rotate-0 hover:scale-95 duration-500 md:ml-36' ></div> : ''
                }

                {/* //////////////// */}
                <div className='p-10 hidden lg:block mt-10 '>

                    <p className='flex text-blue-400 poppins drop-shadow-sm font-bold text-2xl tracking-wider'>Author: {novel.author?.userName} </p>
                    <p className='flex text-blue-400 poppins drop-shadow-sm font-bold text-2xl tracking-wider'>Publish Date: {novel.publish_date}</p>
                    <p className='flex text-blue-400 poppins drop-shadow-sm font-bold text-2xl tracking-wider'>Rating: {novel.rate}</p>

                    <br />

                    <div className='flex mt-3'>
                        <button className=' bg-red-500 h-10 p-2 w-52 rounded-full text-white 
                        font-medium mr-2 drop-shadow-lg hover:scale-105 hover:ml-1 hover:bg-red-600 duration-500'>Read Now</button>
                        <button className=' bg-blue-500 h-10 p-2 w-52 rounded-full
                         text-white font-medium drop-shadow-lg hover:scale-105 hover:ml-1 hover:bg-blue-600 duration-500'>Add to library</button>
                        <i className="fa-solid fa-retweet text-white fa-xl mt-5 cursor-pointer m-2" onClick={changeBanner}></i>
                    </div>
                </div>

            </div>

        </>
    )
}
