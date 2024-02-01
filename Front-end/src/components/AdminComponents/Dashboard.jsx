import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getDashboardDataAPI } from '../../APIs/adminAPI'
import { PieChart } from '@mui/x-charts/PieChart';

function Dashboard() {

    const [userNumber, setUserNumber] = useState(0);
    const [authorNumber, setAuthorNumber] = useState(0);
    const [novelsNumber, setNovelsNumber] = useState(0);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {

            const response = await getDashboardDataAPI()
            if (response.data.status) {
                setUserNumber(response.data.users);
                setAuthorNumber(response.data.authors);
                setNovelsNumber(response.data.novels);
            }

        } catch (error) {
            console.log('catch error on getData ::AdminDashboard - ', error);
            toast.error(error.message);
        }
    }

    return (

        <div className='ml-72 text-white poppins2'>

            <div className='bg-gray-700 w-full min-h-screen pt-5 pl-3 pb-10'>
                <p className='text-3xl font-mono m-10'>Admin DashBoard</p>
                <div className='w-full h-52 flex gap-5 p-4'>
                    {/* ...................USER............... */}
                    <div className='bg-gradient-to-t from-blue-700 via-blue-500 to-blue-300 hover-scale
                     h-full w-full rounded-3xl flex flex-col justify-center pl-5 gap-1 shadow-2xl shadow-black '>
                        <div className='bg-white w-16 h-16 rounded-3xl place-items-center justify-center
                         flex shadow-xl'>
                            <i class="fa-solid fa-user text-blue-500 text-4xl drop-shadow-lg"></i>
                        </div>
                        <p className='text-4xl mt-2 font-bold'>{userNumber}</p>
                        <p className='text-gray-200'>Number of users</p>
                    </div>
                    {/* <<<<<<<<<<<<<<<<<AUTHOR>>>>>>>>>>>>>>>>> */}
                    <div className='bg-gradient-to-t from-violet-700 via-violet-500 to-violet-300 hover-scale
                     h-full w-full rounded-3xl flex flex-col justify-center pl-5 pr-5 gap-1 shadow-2xl shadow-black '>
                        <div className='bg-white w-full h-16 rounded-3xl place-items-center justify-center
                         flex shadow-xl'>
                            <i class="fa-solid fa-user-pen text-violet-500 text-4xl drop-shadow-lg"></i>
                        </div>
                        <p className='text-4xl mt-2 font-bold'>{authorNumber}</p>
                        <p className='text-gray-200'>Number of Authors</p>
                    </div>
                    {/* <<<<<<<<<<<<<<<<<<<<<<<< NOVELS >>>>>>>>>>>>>>>>>>>>>>>> */}
                    <div className='bg-gradient-to-t from-red-700 via-red-500 to-red-300 hover-scale
                     h-full w-full rounded-3xl flex flex-col justify-center pl-5 gap-1 shadow-2xl shadow-black '>
                        <div className='bg-white w-16 h-16 rounded-3xl place-items-center justify-center
                         flex shadow-xl'>
                            <i class="fa-solid fa-book text-red-500 text-4xl drop-shadow-lg"></i>
                        </div>
                        <p className='text-4xl mt-2 font-bold'>{novelsNumber}</p>
                        <p className='text-gray-200'>Number of Novels</p>
                    </div>

                </div>

                <div className='mt-10 bg-gray-200 shadow-black shadow-xl'>

                    <PieChart
                        series={[
                            {
                                data: [
                                    { id: 0, value: 6, label: 'action' },
                                    { id: 1, value: 4, label: 'romance' },
                                    { id: 2, value: 3, label: 'comedy' },
                                    { id: 3, value: 3, label: 'School Life' },
                                    { id: 4, value: 1, label: 'Mystery' },
                                    { id: 5, value: 1, label: 'isekai' },
                                ],
                                innerRadius: 30,
                                outerRadius: 100,
                                paddingAngle: 5,
                                cornerRadius: 5,
                                startAngle: -90,
                                endAngle: 180,
                                cx: 150,
                                cy: 150,

                            },
                        ]}
                        width={700}
                        height={300}
                    />

                </div>
            </div>

        </div>

    )
}

export default Dashboard