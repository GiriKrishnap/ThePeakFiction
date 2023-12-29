import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from '../../../util/axios'
import { Login } from '../../../util/constants';
import { useDispatch, useSelector } from 'react-redux';
import { userSignup } from '../../../redux/Actions/userActions/signupActions';
//.........................................................................

export default function Signup() {

    //.........................................................................

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [confirmPassword, SetConfirmPassword] = useState('');
    const [isAuthor, setIsAuthor] = useState(false);

    //.........................................................................

    const navigate = useNavigate();
    const dispatch = useDispatch()

    //.........................................................................

    const signup = useSelector(state => state.userSignup)
    let { loading, error, userInfo } = signup

    //.........................................................................


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!userName || !email || !password || !confirmPassword || password !== confirmPassword) {
            error = 'Fill the Form correctly'
        }

        dispatch(userSignup(userName, email, password, isAuthor)).then(() => {

            if (userInfo) {
                navigate(Login);
            }
        })
    }

    //.........................................................................


    return (
        <>
            <div className='outerDiv-login'>
                <div className='mainBody-login'>
                    <div className="row flex flex-col md:flex-row">
                        <div className='right-login w-full md:w-1/2'>

                            <div>
                                <form action="" onSubmit={handleSubmit}>
                                    <h1 className='font-sans text-4xl font-medium mb-5'>Signup</h1>
                                    <input type="text" name="userName" className='input-login d-block' placeholder='userName'
                                        onChange={e => setUserName(e.target.value)} value={userName} required />
                                    <input type="email" name="email" className='input-login d-block' placeholder='Email'
                                        onChange={e => setEmail(e.target.value)} value={email} required />
                                    <input type="password" name="password" className='input-login d-block' placeholder='Password'
                                        onChange={e => SetPassword(e.target.value)} value={password} required />
                                    <input type="password" name="ConfirmPassword" className='input-login d-block' placeholder='Confirm Password'
                                        onChange={e => SetConfirmPassword(e.target.value)} value={confirmPassword} required />
                                    <div className='flex flex-row'>
                                        <input type="checkbox" className='mb-3 ml-3 cursor-pointer w-4'
                                            onClick={() => isAuthor ? setIsAuthor(false) : setIsAuthor(true)}
                                        />
                                        <label className='mb-3 ml-2 font-mono'>Are You An Author?</label>
                                    </div>
                                    <button type='submit' className='button-login mb-3'>Signup Now</button>
                                </form>
                                <Link to={Login}> <p className='aTag-login'>You Have Account?</p> </Link>
                                {error ? <p className='text-red-500'>{error}</p> : " "}
                            </div>
                        </div>

                        <div className='left-login hover-scale w-full md:w-1/2 flex flex-col place-items-center bg-gray-800'>

                            <img src="../assets/logo/webLogo.png" alt="logo" className='logo-login' />
                            <h1 className='text-white handwrite-font text-3xl'>ThePeakFiction</h1>
                            <p className='text-white dancing-font mb-6'>"Unlock worlds, one page at a time."</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
//.........................................................................
