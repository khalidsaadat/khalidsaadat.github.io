// My Connections component
// Author: Khalid Sadat
// Date created: March 2, 2023
// Description: Connections component for showing user's connections

import React, { useEffect, useState } from "react";
import { RiSendPlaneFill } from 'react-icons/ri'
import profile_pic from '../../static/images/profile.jpg'
import { Link, useNavigate } from "react-router-dom";
import StartDM from "../messages/StartDM";
import PositionName from '../shared/PositionName';
import Avatar from "../shared/Avatar";
import VerifiedUser from "./VerifiedUser";

export default function MyConnections(props) {
    // var connections = props.connections;
    
    const navigate = useNavigate(); 

    const profileNavigate = (uid) => {
        navigate(`/profile/${uid}`);
        window.location.reload();
    
    };

    return (
        <div class="w-1/4 hidden lg:block bg-white p-5 rounded-t-xl">
            <div className='mb-5'>
                <p className='text-lg font-semibold'>
                    My Connections
                </p>
            </div>

        
            {props.connections.map((connections) => (
                <div>
                    <div className="flex justify-left mt-2 mb-3">
                        <div className="flex items-start">
                            <div className='avatar'>
                                <div className="w-12 rounded-full">
                                    {/* <img src={profile_pic} /> */}
                                    <Avatar userId={connections._id} />
                                </div>
                            </div>
                            <div className="flex flex-col pl-5">
                                {/* <Link to={`/profile/${connections._id}`}> */}
                                <button onClick={() => profileNavigate(connections._id)}>
                                    {/* <p className="lg:text-md font-semibold text-left" >
                                        {connections.name}
                                    </p> */}
                                    <div className="flex items-center">
                                        <div className="w-auto">
                                            {connections.name}
                                        </div>
                                        <VerifiedUser name={connections.name} />
                                    </div>
                                </button>
                                {/* </Link> */}
                                <span className="text-sm">
                                    <PositionName id={connections._id}/>
                                </span>
                                <div className="mt-2">
                                    <StartDM userId={connections._id} userName={connections.name}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    )
}