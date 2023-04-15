//Messages
//Author: Daria Koroleva
//Created: March 5,2023
//Description: Show messages send/receive between two users
import React, { useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import Message from './Message'
import MessageSender from './MessageSender';

function Chat(props) {

    const { conversation, addMessage, removeMessage, selectReport, openPasswordDecrypt } = props;
    const chatRef = useRef(null);

    const scrollToBottom = () => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversation?.messages.length]);
    

    if (!conversation) {
        return <div></div>;
    }

    return (
        <div>
            <ChatHeader avatar={conversation.avatar} user={conversation.user} name={conversation.name} title={conversation.title} />
            <div className="p-2 sm:overflow-y-auto sm:max-h-[calc(100vh-380px)]"  ref={chatRef}>
                {conversation.messages.map((m) => {
                    return (
                        <div key={m.id}>
                            <Message
                                message={m}
                                removeMessage={removeMessage}
                                selectReport={selectReport}
                                openPasswordDecrypt={openPasswordDecrypt}
                            />
                        </div>
                    )
                }
                )}
            </div>

            <div className='border mt-4'>
                <MessageSender receiver={conversation.user} addMessage={addMessage} />
            </div>
        </div>
    )
}

export default Chat