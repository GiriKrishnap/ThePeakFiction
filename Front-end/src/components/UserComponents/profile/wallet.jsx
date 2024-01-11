import React from 'react';
import axios from '../../../util/axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { getUserById } from '../../../util/constants';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
//.........................................................................

export default function WalletComponent() {

    //.........................................................................
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [walletAmount, setWalletAmount] = useState({});
    //.........................................................................

    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const navigate = useNavigate();

    //.........................................................................

    const getWallet = async () => {

        const userId = JSON.parse(localStorage.getItem("user-login")).id
        axios.get(`${getUserById}${userId}`).then((response) => {
            if (response.data.status) {
                console.log('response.data.walletDetails - ', response.data.walletDetails)
                setWalletAmount(response.data.walletDetails);
            }
        })
    }

    //.........................................................................

    useEffect(() => {

        getWallet();

    }, [])

    //.........................................................................


    const makePayment = async (givenAmount) => {
        const stripe = await loadStripe(process.env.REACT_APP_STRIP_PUBLISHER_KEY);

        const body = {
            amount: givenAmount
        }
        const headers = {
            "Content-Type": "application/json"
        }
        const response = await fetch("http://localhost:4000/create-payment-intent", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body)
        });

        const session = await response.json();
        console.log("session.id --- ", session)

        const result = stripe.redirectToCheckout({
            sessionId: session.id
        });

        if (result.error) {
            console.log(result.error);
        }
    }




    //.........................................................................

    return (

        <>
            <div className='bg-gray-800 rounded-3xl drop-shadow-md'>

                <div className='bg-blue-500 hover:bg-blue-600 w-96 p-6 rounded-3xl
                 flex flex-col justify-center place-items-center gap-2 drop-shadow-md'>
                    <small className='poppins2'>Total Balance</small>
                    <p className='poppins2 text-4xl font-bold'>
                        <i className="fa-solid fa-indian-rupee-sign"></i> {walletAmount.walletAmount}</p>
                </div>

                <div className='p-10 text-2xl flex justify-center gap-10'>
                    {/* ................ADD MONEY............. */}

                    <i className="fa-solid fa-square-plus fa-2xl drop-shadow-md hover:scale-105
                     duration-200 hover:-rotate-6 hover:text-gray-600"
                        onClick={() => setIsModalOpen(!isModalOpen)} ></i>

                    <i className="fa-solid fa-list-ol fa-2xl drop-shadow-md hover:scale-105
                     duration-200 hover:rotate-6 hover:text-gray-600"></i>
                </div>

                {
                    isModalOpen ?
                        <div className='text-center font-mono'>
                            <small className='text-gray-300'>please select your value</small>
                            <div className='flex gap-3 duration-700
                             bg-gray-700 rounded-b-3xl w-full h-24 drop-shadow-md p-5 poppins2'>

                                <button className='bg-blue-300 p-3 rounded-lg grow hover:scale-105 '
                                    onClick={() => makePayment(10)}>
                                    + 10rs
                                </button>
                                <button className='bg-blue-400 p-3 rounded-lg grow hover:scale-105'
                                    onClick={() => makePayment(10)}>
                                    + 15rs
                                </button>
                                <button className='bg-blue-500 p-3 rounded-lg grow hover:scale-105'
                                    onClick={() => makePayment(10)}>
                                    + 20rs
                                </button>
                                <button className='bg-blue-600 p-3 rounded-lg grow hover:scale-105'
                                    onClick={() => makePayment(10)}>
                                    + 50rs
                                </button>

                            </div>
                        </div>

                        : ''
                }

            </div>
        </>
    )
}
//.........................................................................