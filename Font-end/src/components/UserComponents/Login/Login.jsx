import React from 'react'
import './Login.css'

export default function Login() {
    return (
        <>
            <div className='outerDiv-login'>
                <div className='mainBody-login'>
                    <div class="row">
                        <div className='left-login col-12 col-md-6 hover-scale'>

                            <img src="../assets/logo/webLogo.png" alt="logo" className='logo-login' />
                            <h1 className='text-white handwrite-font '>ThePeakFiction</h1>
                            <p className='text-white dancing-font '>"Unlock worlds, one page at a time."</p>

                        </div>
                        <div className='right-login col-12 col-md-6'>

                            <div>
                                <form action="">
                                    <h1 className=''>Login</h1>
                                    <p>Welcome Back</p>
                                    <input type="text" name="userName" id="userName" className='input-login d-block' placeholder='userName' />
                                    <input type="email" name="email" id="userName" className='input-login d-block' placeholder='Email' />
                                    <input type="password" name="password" id="userName" className='input-login d-block' placeholder='Password' />
                                    <input type="password" name="ConfirmPassword" id="userName" className='input-login d-block' placeholder='Confirm Password' />
                                    <button type='submit' className='button-login'>Login Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
