import React from 'react';
import axios from '../../../util/axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { authorNovels, createPaymentIntentURL, getNovelDetailsWithId } from '../../../util/constants';
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import StripeCheckout from 'react-stripe-checkout';
import toast from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import Modal from 'react-modal';
//.........................................................................

export default function WalletComponent() {

    //.........................................................................
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [clientSecret2, setClientSecret2] = useState('');
    //.........................................................................

    const stripe = useStripe();
    const elements = useElements();
    const location = useLocation();
    const navigate = useNavigate();

    //.........................................................................

    // const handleAddAmount = async () => {
    //     // try {

    //     const body = JSON.stringify({
    //         amount: 1000,
    //     })

    //     const response = await axios.post(createPaymentIntentURL, body, {
    //         headers: { "Content-Type": "application/json" }
    //     })

    //     const { clientSecret } = response.data;

    //     return stripePromise.then(stripe => {
    //         const elements = stripe.elements();

    //         setIsModalOpen(true);
    //         setClientSecret(clientSecret.client_secret);
    //         setClientSecret2(clientSecret);
    //     });

    //     // } catch (error) {
    //     //     toast.error('client side catch error');
    //     //     console.log('client side catch error', error.message);
    //     // }


    // };


    const makePayment = async () => {
        const stripe = await loadStripe(process.env.REACT_APP_STRIP_PUBLISHER_KEY);

        const body = {
            amount: 1000
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
                        <i className="fa-solid fa-indian-rupee-sign"></i> 200</p>
                </div>

                <div className='p-10 text-2xl flex justify-center gap-10'>
                    {/* ................ADD MONEY............. */}

                    <i className="fa-solid fa-square-plus fa-2xl drop-shadow-md hover:scale-105
                     duration-200 hover:-rotate-6 hover:text-gray-600"
                        onClick={makePayment}></i>



                    <i className="fa-solid fa-list-ol fa-2xl drop-shadow-md hover:scale-105
                     duration-200 hover:rotate-6 hover:text-gray-600"></i>
                </div>

            </div>
        </>
    )
}
//.........................................................................
