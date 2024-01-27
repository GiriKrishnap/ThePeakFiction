import { getAllMessageAPI, newMessagePostAPI, } from '../../../APIs/userAPI';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CoverUrl } from '../../../util/constants';
import toast from 'react-hot-toast';
import io from 'socket.io-client';

//.........................................................................

export default function Chat() {

    //.........................................................................

    const navigate = useNavigate();
    const location = useLocation();
    const socket = useMemo(() => io('http://localhost:4000'), [])

    //.........................................................................

    const [novelId, setNovelId] = useState('');
    const [name, setName] = useState('');
    const [user_id, setUserId] = useState('');
    const [allMessages, setAllMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');

    //.........................................................................

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
            scrollRef.current?.scrollIntoView({ behavior: "smooth" })

            return () => {
                socket.disconnect();
            }

        } catch (error) {
            toast.error(error.message);
        }

    }, [])

    //.........................................................................

    const getMessages = async (id) => {
        try {

            const response = await getAllMessageAPI(id);

            if (response.data.status) {

                setAllMessages([...response.data.message]);
                setName(response.data.name)

                socket.emit("join_room", id)

            } else {

                toast.error(response.data?.message);
                navigate(-1);
            }

        } catch (error) {
            console.log('error on getMessage - ', error);
            toast.error(error.message);

        }
    }

    //.........................................................................

    useEffect(() => {

        socket.on("Message_received", (data) => {
            setAllMessages((list) => {
                if (Array.isArray(list)) {
                    return [...list, data];
                } else {
                    console.error("Unexpected type for list:", list);
                    return [allMessages];
                }
            });
            return () => socket.off('Message_received', data);
        })

    }, [socket]);

    //.........................................................................

    const handleSend = async () => {
        try {

            if (currentMessage.length > 0) {

                const body = {
                    message: currentMessage,
                    user_id: user_id,
                    date: new Date(),
                    novelId: novelId

                }

                const response = await newMessagePostAPI(body);

                if (response.data.status === true) {

                    await socket.emit("send_message", body);

                    setAllMessages((list) => {

                        if (Array.isArray(list)) {

                            return [...list, response.data.data[response.data.data.length - 1]];
                        } else {

                            console.error("Unexpected type for list:", list);
                            return [body];
                        }
                    });

                    setCurrentMessage('');

                }
            }

        } catch (error) {
            console.log("error om handleSend - - - ", error)
            toast.error(error.message);
        }
    }

    //.........................................................................

    const scrollRef = useRef()

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [allMessages])

    //.........................................................................

    return (
        <>

            <div className='bg-gradient-to-t
             from-gray-700 via-gray-800 to-gray-900 poppins2 m-4 rounded-lg text-white '>

                <div className='chat-header h-20 bg-gray-800 rounded-xl flex place-items-center p-3
                 drop-shadow-2xl shadow-black'>

                    <div
                        className='rounded-2xl h-full w-20 ml-3 mr-3 shadow-xl'
                        style={{
                            backgroundImage: `url(${CoverUrl}/${novelId})`,
                            backgroundSize: 'cover'
                        }} />


                    <p className='text-2xl ml-2 ' >{name}</p>
                </div>


                {/* >>>>>>>>>>>>>>>>> CHAT MIDDLE PART <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}
                {

                    allMessages.length > 0 ?


                        <div className='flex flex-col min-h-80 overflow-y-scroll MESSAGE_PART' >
                            {
                                allMessages.map((item) => (
                                    < >

                                        {
                                            item.user_id?._id === user_id ?

                                                < div className='RIGHT_Chat m-4 mr-10' key={item.user_id?._id}>
                                                    <p className='font-mono text-right m-1 mr-2'>{item.user_id?.userName}</p>
                                                    <div className='bg-gray-600 max-w-96 p-6 rounded-l-3xl rounded-b-3xl
                                                     float-right shadow-2xl shadow-black'>

                                                        <p className='text-left'>
                                                            {item.message}
                                                        </p>
                                                    </div>
                                                </div >
                                                :
                                                <div className='LEFT_Chat m-4 ml-10' key={item.user_id?._id}>
                                                    <p className='font-mono m-1 ml-2'> {item.user_id?.userName}</p>
                                                    <div className='bg-blue-500 max-w-96 p-6 rounded-r-3xl rounded-b-3xl
                                                    shadow-2xl shadow-black'>

                                                        <p>
                                                            {item.message}
                                                        </p>
                                                    </div>
                                                </div>

                                        }

                                    </>
                                ))
                            }
                            <p className='text-center m-1 text-gray-500 opacity-5' ref={scrollRef}> -- end -- </p>
                        </div>


                        : <p className='m-36 text-center'>There is No Message</p>}
                {/* >>>>>>>>>>>>>>>>> CHAT MIDDLE PART END <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}



                {/* >>>>>>>>>>>>>>>>>>>>>>>>>> CHAT BOTTOM PART <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}

                <div className='w-full h-20 bg-gray-800 rounded-xl shadow-xl shadow-black'>

                    <div className='flex gap-5 p-5 justify-center place-items-center'>
                        <input type="text" className='w-full p-2 pl-4 rounded-xl text-black'
                            onChange={(e) => setCurrentMessage(e.target.value)}
                            value={currentMessage}
                            onKeyPress={(event) => {
                                event.key === "Enter" && handleSend();
                            }}
                        />

                        <button className='w-32 p-2 bg-blue-300 text-black hover:text-white
                         hover:bg-gray-700 rounded-lg font-semibold'
                            onClick={handleSend}>
                            send <i className='fa-solid fa-paper-plane '></i>
                        </button>
                    </div>

                </div>

                {/* >>>>>>>>>>>>>>>>>>>>>>>>>> CHAT BOTTOM PART END<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< */}

            </div >

        </>
    )
}

//............................................................................
