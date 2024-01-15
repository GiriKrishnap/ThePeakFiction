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

            <div className='bg-gradient-to-t
             from-gray-700 via-gray-800 to-gray-900 poppins2 m-4 rounded-lg text-white max-h-screen overflow-y-scroll'>

                <div className='chat-header h-20 bg-gray-800 rounded-xl flex place-items-center'>

                    <img src="https://picsum.photos/200/300" alt='img'
                        className='rounded-full h-full w-20 ml-2 p-3 shadow-xl' />

                    <p className='text-2xl ml-2'>Spy X Family Community</p>

                </div>


                {/* >>>>>>>>>>>>>>>>> CHAT MIDDLE PART <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
                <div className='h-full flex flex-col'>

                    <div className='Right_Chat m-4 ml-10'>
                        <div className='bg-blue-500 h-32 w-96 p-4 rounded-r-3xl rounded-b-3xl'>
                            <p className='font-mono'>John</p>
                            <p>hello how are you, iam John from manjeri</p>
                        </div>
                    </div>



                    <div className='Left_Chat m-4 mr-10'>
                        <div className='bg-gray-600 h-32 w-96 p-4 rounded-l-3xl rounded-b-3xl justify-end float-right'>
                            <p className='font-mono text-right'>John</p>
                            <p className='text-right'>hello how are you, iam John from manjeri</p>
                        </div>
                    </div>

                    {/* >>>>>>>>>>>>>>>>> CHAT MIDDLE PART END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}



                    {/* >>>>>>>>>>>>>>>>>>>>>>>>>> CHAT BOTTOM PART <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}



                    {/* >>>>>>>>>>>>>>>>>>>>>>>>>> CHAT BOTTOM PART END<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}


                </div>

            </div>

        </>
    )
}
//............................................................................
