//Messages
//Author: Daria Koroleva
//Created: March 5,2023
//Description: Component to render a message

import React, { useState } from 'react'
import Attachment from './Attachment'
import MessageOptions from './MessageOptions'
import { Link } from "react-router-dom"
import Avatar from '../shared/Avatar'
import VerifiedUser from '../profile/VerifiedUser';

function Message(props) {
    

    const { message, removeMessage, selectReport, openPasswordDecrypt } = props;
    const [isReportedMessageVisible, setIsReportedMessageVisible] = useState(false);

    function showReportedMessage() {
        setIsReportedMessageVisible(true);
    }

    function hideReportedMessage() {
        setIsReportedMessageVisible(false);
    }


    return (
        <div>
            {(() => {

                if (message.position === "start" && message.reportType !== null && !isReportedMessageVisible) {
                    return (
                        <div className="alert shadow-lg bg-red-200">
                            <div>
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <Avatar userId={message.user}/>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-bold">Message reported!</h3>
                                    <div className="text-xs">Content hidden</div>
                                </div>
                            </div>
                            <div className="flex-none">
                                <button onClick={showReportedMessage} className="btn btn-sm">View</button>
                            </div>
                        </div>
                    )
                }
                else if (message.position === "start" && message.reportType !== null && isReportedMessageVisible) {
                    return (
                        <div className="alert shadow-lg">
                            <div className="chat chat-start">
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <Avatar userId={message.user}/>
                                    </div>
                                </div>
                                <div className="chat-header">
                                    {`${message.name} `}
                                    <time className="text-xs opacity-50">{message.time}</time>
                                </div>
                                <div className="flex items-center w-full">
                                    <div className="chat-bubble flex-grow">
                                        {message.message}
                                        <Attachment attachments={message.attachments} openPasswordDecrypt={openPasswordDecrypt} />
                                    </div>
                                    <div className="flex-none ml-2">
                                        <button onClick={hideReportedMessage} className="btn btn-sm">Hide</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    )
                }
                else if (message.position === "start") {
                    return (
                        <div className="chat chat-start">
                            <div className="chat-image avatar flex items-center ">
                                <div className="w-10 rounded-full flex mr-3 bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                    <Link to={`/profile/${message.user}`}>
                                        <Avatar userId={message.user}/>
                                    </Link>
                                </div>
                            </div>
                            <div className="chat-header">
                                <div className="flex items-center">
                                    <div className="w-auto">
                                        {`${message.name} `}
                                    </div>
                                    <VerifiedUser name={message.name} type='dms'/>&nbsp;
                                    <time className="text-xs opacity-50">{message.time}</time>
                                </div>
                            </div>
                            <div className="flex items-center group">
                                <div className="chat-bubble">
                                    {message.message}
                                    <Attachment attachments={message.attachments} openPasswordDecrypt={openPasswordDecrypt} />
                                </div>

                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <MessageOptions
                                        id={message.id}
                                        canReport={true}
                                        selectReport={selectReport}
                                        removeMessage={removeMessage} />
                                </div>
                            </div>
                        </div>

                    )
                }
                else {
                    return (
                        <div className="chat chat-end">
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <Link to={`/profile/${message.user}`}>
                                        <Avatar userId={message.user}/>
                                    </Link>
                                </div>
                            </div>
                            <div className="chat-header">
                                <div className="flex items-center">
                                    <div className="w-auto">
                                        {`${message.name} `}
                                    </div>
                                    <VerifiedUser name={message.name} type='dms'/>&nbsp;
                                    <time className="text-xs opacity-50">{message.time}</time>
                                </div>
                            </div>
                            <div className="flex items-center group">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    <MessageOptions id={message.id} removeMessage={removeMessage} canReport={false} />
                                </div>
                                <div className="chat-bubble">
                                    {message.message}
                                    <Attachment attachments={message.attachments} openPasswordDecrypt={openPasswordDecrypt} />
                                </div>
                            </div>
                        </div>

                    )
                }
            })()}

        </div>
    )
}

export default Message