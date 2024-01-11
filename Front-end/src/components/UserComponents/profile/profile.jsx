import axios from '../../../util/axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthorAddChapter, CoverUrl, getNovelDetailsWithId } from '../../../util/constants';
//.........................................................................

export default function ProfileComponent() {

    //.........................................................................

    const location = useLocation();
    const navigate = useNavigate();

    //.........................................................................

    const [userData, setUserData] = useState();

    //.........................................................................

    useEffect(() => {
        setUserData(JSON.parse(localStorage.getItem("user-login")));
    
    }, [])

    //.........................................................................

    return (

        <>
            {
                userData ?
                    <div className='justify-center poppins2 md:w-80 w-full flex flex-col'>
                        <div className=''>

                            <p>User Name</p>
                            <input type="text" value={userData.userName} disabled
                                className='p-2 pl-5 m-1 rounded-2xl text-gray-300 w-full' />

                            <p>Email</p>
                            <input type="text" value={userData.email} disabled
                                className='p-2 pl-5 m-1 rounded-2xl  text-gray-300 w-full' />

                            <p>Role</p>
                            <input type="text" value={userData.isAuthor ? 'Author' : 'Reader'} disabled
                                className='p-2 pl-5 m-1 rounded-2xl  text-gray-300 w-full' />
                            <br />

                            <button className='bg-blue-600 p-2 mt-5 
                            rounded-2xl w-full hover:bg-blue-800'>
                                Edit Profile
                            </button>
                        </div>

                    </div> : ''
            }
        </>
    )
}
//.........................................................................
