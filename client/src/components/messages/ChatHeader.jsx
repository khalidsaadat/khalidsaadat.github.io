//Messages
//Author: Daria Koroleva
//Created: March 5,2023
//Description: Show chat header for receiver user

import React from 'react'
import { Link } from "react-router-dom"
import Avatar from '../shared/Avatar';
import VerifiedUser from '../profile/VerifiedUser';

function ChatHeader(props) {

    const {  user, name, title } = props;

    return (
        <div className="w-full m-auto p-2 shadow-lg ">
            <div className="container inline-flex justify-between">
                <div className='w-1/8 avatar'>
                    <div class="w-12 h-12 rounded-full bg-gray-800">
                        <Link to={`/profile/${user}`}>                            
                            <Avatar userId={user} />
                        </Link>
                    </div>
                </div>
                <div className="flex-grow p-2">
                    <p className="lg:text-md font-semibold">
                        <div className="flex items-center">
                            <div className="w-auto">
                                {name}
                            </div>
                            <VerifiedUser name={name} type='dms'/>
                        </div>
                    </p>
                    {/* <p className="lg:text-md">{title}</p> */}
                </div>
            </div>
        </div>
    )
}

export default ChatHeader