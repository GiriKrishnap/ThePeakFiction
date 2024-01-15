import React from 'react'
import HeaderComponents from '../../components/UserComponents/header-footer/header.jsx';
import FooterComponents from '../../components/UserComponents/header-footer/footer.jsx';
import ChatComponent from '../../components/UserComponents/community-chat/chat.jsx'


function ChatPage() {
    return (
        <div>
            <HeaderComponents />
            <ChatComponent />
            <FooterComponents />
        </div>
    )
}

export default ChatPage;