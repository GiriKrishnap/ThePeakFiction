import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { addNovelToLibraryAPI, getAllMessageAPI, getRandomNovelAPI, newMessagePostAPI } from '../../../APIs/userAPI';
import { CoverUrl, novelDetailedView } from '../../../util/constants';
import toast from 'react-hot-toast';
// import { initializeSocket } from '../../../services/socketIo/socket_io'
import io from 'socket.io-client'



//.........................................................................


export default function Chat() {

    //.........................................................................

    const navigate = useNavigate();
    const location = useLocation();


    //.........................................................................

    const [novelId, setNovelId] = useState('');
    const [userId, setUserId] = useState('');
    const [newMessage, setNewMessage] = useState("");
    const [allMessages, setAllMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [socketConnected, setSocketConnected] = useState(false);

    //.........................................................................
    const socket = useMemo(() => io('http://localhost:4000'), [])

    useEffect(() => {
        try {

            const queryParams = new URLSearchParams(location.search);
            const NovelId = queryParams.get('novelId');

            if (!NovelId) {
                navigate(-1);
            }
            setUserId(JSON.parse(localStorage.getItem("user-login")).id);
            setNovelId(NovelId);

            getMessages(NovelId);


        } catch (error) {
            toast.error(error.message);
        }

    }, [])

    useEffect(() => {
        socket.on("Message_received", (data) => {
            setAllMessages((list) => {
                if (Array.isArray(list)) {
                    return [...list, data];
                } else {
                    console.error("Unexpected type for list:", list);
                    return [data];
                }
            });
        });




    }, [socket]);



    //.........................................................................

    const getMessages = async (id) => {
        try {


            const response = await getAllMessageAPI(id);
            if (response.data.status) {
                setAllMessages(response.data.messages);
                console.log('messages from backend - ', response.data.messages);
                toast.success('got All messages');
                await socket.emit("join_room", id);
            } else {
                toast.error(response.data?.message);

            }

        } catch (error) {
            console.log('error on getMessage - ', error);
            toast.error(error.message);

        }
    }

    //.........................................................................

    const handleSend = async () => {
        try {

            if (currentMessage.length > 0) {

                const body = {
                    message: currentMessage,
                    userId: userId,
                    date: new Date(),
                    novelId: novelId

                }

                await socket.emit("send_message", body);
                const response = await newMessagePostAPI(body);

                // setAllMessages((list) => [...list, body]);

            }

        } catch (error) {
            console.log("error om handleSend - - - ", error)
            toast.error(error.message);
        }
    }
    //.........................................................................

    return (
        <>

            <div className='bg-gradient-to-t
             from-gray-700 via-gray-800 to-gray-900 poppins2 m-4 rounded-lg text-white '>

                <div className='chat-header h-20 bg-gray-800 rounded-xl flex place-items-center'>

                    <img src="https://picsum.photos/200/300" alt='img'
                        className='rounded-full h-full w-20 ml-2 p-3 shadow-xl' />

                    <p className='text-2xl ml-2 font-mono'>Spy X Family Community</p>


                </div>


                {/* >>>>>>>>>>>>>>>>> CHAT MIDDLE PART <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
                {
                    allMessages ?


                        <div className='flex flex-col overflow-y-scroll MESSAGE_PART'>

                            {
                                allMessages.map((item) => (



                                    < >




                                        {
                                            item.userId === userId ?

                                                < div className='Left_Chat m-4 mr-10' key={item.userId}>
                                                    <div className='bg-gray-600 max-w-96 p-6 rounded-l-3xl rounded-b-3xl float-right'>
                                                        <p className='font-mono text-right'> - {item.userId} - </p>

                                                        <p className='text-left'>
                                                            {item.message}
                                                        </p>

                                                    </div>
                                                </div > : <div className='Right_Chat m-4 ml-10' key={item.userId}>
                                                    <div className='bg-blue-500 max-w-96 p-6 rounded-r-3xl rounded-b-3xl'>
                                                        <p className='font-mono'> - {item.userId} - </p>

                                                        <p>
                                                            {item.message}
                                                        </p>

                                                    </div>
                                                </div>

                                        }

                                    </>
                                ))
                            }
                        </div>

                        : <p className='m-36 text-center'>There is No Message</p>}
                {/* >>>>>>>>>>>>>>>>> CHAT MIDDLE PART END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}



                {/* >>>>>>>>>>>>>>>>>>>>>>>>>> CHAT BOTTOM PART <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}

                <div className='w-full h-20 bg-gray-800 rounded-xl'>

                    <div className='flex gap-5 p-5 justify-center place-items-center'>
                        <input type="text" className='w-full p-2 pl-4 rounded-xl text-black'
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            value={currentMessage}
                            onKeyPress={(event) => {
                                event.key === "Enter" && handleSend();
                            }}
                        />

                        <button className='w-32 p-2 bg-blue-500 hover:bg-blue-600 rounded-lg'
                            onClick={handleSend}>
                            send <i className='fa-solid fa-paper-plane'></i>
                        </button>
                    </div>

                </div>

                {/* >>>>>>>>>>>>>>>>>>>>>>>>>> CHAT BOTTOM PART END<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}



            </div >

        </>
    )
}
//............................................................................
