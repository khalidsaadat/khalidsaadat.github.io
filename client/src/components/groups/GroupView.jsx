// Group view component
// Author: Khalid Sadat
// Date created: March 1, 2023
// Description: User profile components that is responsible for rendering all sub parts such as experience, education, skills, etc.

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import moment from 'moment';

import ProfileCover from '../profile/ProfileCover'

import { BsCalendarDate } from 'react-icons/bs'

export default function GroupView() {
    const loggedInUserId = localStorage.getItem("uid");

    const {groupId} = useParams();
    const [group, setGroup] = useState([]);
    const [profile, setProfile] = useState([]);
    const [isJoined, setIsJoined] = useState(false);
    const [status, setStatus] = useState(false);
    const [members, setMembers] = useState([]);
    const [membersCount, setMembersCount] = useState('');


    // Checking if current user already a member of this group
    const currentGroupInfo = {groupId: groupId, memberId: loggedInUserId};
    useEffect(() => {
        axios.get('/api/groups/checkMember?', {
            params: {groupId: groupId, memberId: loggedInUserId}
        })
        .then(res => {
            if(res.data.message == 'true') {
                // user is registered
                setIsJoined(true);
            }
        }).catch(err => {
            console.log(err)
        })

    }, []);


    // Getting the current even information by its id
    useEffect(() => {
        axios.get('/api/groups/getGroupById?', {
            params: {id: groupId}
        })
        .then(res => {
            setGroup(res.data);
        }).catch(err => {
            console.log(err)
        })
    }, []);

    // Getting the info of the group creator
    useEffect(() => {
        axios.get('/api/account/getUser?', {
            params: {id: group.creator}
        })
        .then(res => {
            setProfile(res.data);
            setMembers(group.members);
        }).catch(err => {
            console.log(err)
        })
    }, [group.creator]);

    useEffect(() => {
        console.log("status" + group.status);
    }, []);

    // Joining an event
    const joinGroup = async (e) => {
        e.preventDefault();
        
        var token = 'ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==';
        
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
        
        // const joinEventInfo = {eventId: eventId, memberId: loggedInUserId};

        await axios.put('/api/groups/join', currentGroupInfo, headers)
        .then((res) => {
            console.log("Group joined", res);
            // setIsNewJoined(true);
            setIsJoined(true);
            setMembers(group.members);
        })
        .catch(err => console.log('Error', err))
    }

    // Leavning an event
    const leaveGroup = async (e) => {
        e.preventDefault();
        
        var token = 'ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==';
        
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
        
        // const joinEventInfo = {eventId: eventId, memberId: loggedInUserId};

        await axios.post('/api/groups/leave', currentGroupInfo, headers)
        .then((res) => {
            console.log("Group left", res);
            // setIsNewJoined(true);
            setIsJoined(false);
            setMembers(group.members);
        })
        .catch(err => console.log('Error', err))
    }

    console.log("joined? " + isJoined);
    
    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Groups</title>
            </Helmet>
            <div class="flex flex-col items-center mt-5">
                <div class="flex-auto w-full md:w-3/4 lg:w-4/5 lg:p-5">
                    <div className="flex lg:gap-8">
                        <div class="w-full lg:w-3/4 bg-white relative lg:rounded-t-xl">
                            <ProfileCover name={group.name} position={group.location} type='events'/>
                            <hr/>
                            
                            <div class="flex items-center">
                                <div class="w-2/3 mr-2">
                                    <div className='p-5'>
                                        <div className='leading-loose'>
                                            {isJoined && 
                                                <span id="badge-dismiss-yellow" class="inline-flex items-center mb-4 px-2 py-1 mr-2 text-sm font-medium text-yellow-800 bg-yellow-100 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                                    You are already a member of this group.
                                                </span>
                                            }
                                            
                                            {group.status == false &&
                                                <span id="badge-dismiss-yellow" class="inline-flex items-center mb-4 px-2 py-1 mr-2 text-sm font-medium text-yellow-800 bg-yellow-100 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                                    This group does not accept new members at this time!
                                                </span>
                                            }      

                                            {/* <div className='text-md font-extrabold' style={{color: '#b74700'}}>
                                                {eventDate.toLocaleDateString()}
                                            </div> */}
                                            <div>
                                                Group by&nbsp;
                                                <span className='font-extrabold' style={{color: '#266DD3'}}>
                                                    {profile.name}
                                                </span>
                                            </div>
                                            <div>
                                                {members && members.length}&nbsp;
                                                {members && (members.length >= 0 && members.length <= 1) ? "member" : "members"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-1/3 text-right mr-3">
                                    {(isJoined) ?
                                    <>
                                    <form>
                                        <button onClick={leaveGroup} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                            Leave Group
                                        </button>
                                    </form>
                                    </>
                                    :
                                    <>
                                    <form>
                                        <button onClick={joinGroup} class={`py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${group.status == false ? "cursor-not-allowed" : ""}`} disabled={group.status == false ? true : false}>
                                            Join
                                        </button>
                                    </form>
                                    </>
                                    }
                                </div>
                            </div>
                            <hr />
                            
                            <div className='p-5'>
                                {group.description}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}