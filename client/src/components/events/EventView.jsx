// User profile component
// Author: Khalid Sadat
// Date created: March 1, 2023
// Description: User profile components that is responsible for rendering all sub parts such as experience, education, skills, etc.

import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import moment from 'moment';

import ProfileCover from '../profile/ProfileCover'
import SimilarEvents from './SimilarEvents'

import { BsCalendarDate } from 'react-icons/bs'

export default function EventView() {
    const loggedInUserId = localStorage.getItem("uid");

    const {eventId} = useParams();
    const [event, setEvent] = useState([]);
    const [profile, setProfile] = useState([]);
    const [isJoined, setIsJoined] = useState(false);
    const [membersCount, setMembersCount] = useState('');

    const [event_date, setEventDate] = useState('');


    // Checking if current user already registered for this event
    const currentEventInfo = {eventId: eventId, memberId: loggedInUserId};
    useEffect(() => {
        axios.get('/api/events/checkMember?', {
            params: {eventId: eventId, memberId: loggedInUserId}
        })
        .then(res => {
            if(res.data.message == 'true') {
                // user is registered
                setIsJoined(true);
            }
        }).catch(err => {
            console.log(err)
        })

        axios.get('/api/events/countMembers?', {
            params: {eventId: eventId}
        })
        .then(res => {
            setMembersCount(res.data);
        }).catch(err => {
            console.log(err)
        })

    }, []);


    // Getting the current even information by its id
    useEffect(() => {
        axios.get('/api/events/getEventById?', {
            params: {id: eventId}
        })
        .then(res => {
            setEvent(res.data);
        }).catch(err => {
            console.log(err)
        })
    }, []);

    // Setting the event date to a string variable
    useEffect(() => {
        setEventDate(event.date);  
    });
    var eventDate = new Date(event_date);
    var eventDateFormatted = moment(eventDate).utc().format('dddd, MMMM Do YYYY');
    var currentDate = moment().format('dddd, MMMM Do YYYY');

    var eventDateMoment = moment(eventDate);
    var currentDateMoment = moment(new Date());
    var eventDaysDifference = currentDateMoment.diff(eventDateMoment, "days");
    

    // Getting the info of the event creator
    useEffect(() => {
        axios.get('/api/account/getUser?', {
            params: {id: event.creator}
        })
        .then(res => {
            setProfile(res.data);
        }).catch(err => {
            console.log(err)
        })
    }, [event.creator]);

    // Joining an event
    const joinEvent = async (e) => {
        e.preventDefault();
        
        var token = 'ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==';
        
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
        
        // const joinEventInfo = {eventId: eventId, memberId: loggedInUserId};

        await axios.put('/api/events/join', currentEventInfo, headers)
        .then((res) => {
            console.log("Event joined", res);
            // setIsNewJoined(true);
            setIsJoined(true);
        })
        .catch(err => console.log('Error', err))
    }

    // Leavning an event
    const leaveEvent = async (e) => {
        e.preventDefault();
        
        var token = 'ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==';
        
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
        
        // const joinEventInfo = {eventId: eventId, memberId: loggedInUserId};

        await axios.post('/api/events/unjoin', currentEventInfo, headers)
        .then((res) => {
            console.log("Leaving event", res);
            // setIsNewJoined(true);
            setIsJoined(false);
        })
        .catch(err => console.log('Error', err))
    }
    
    return (
        <div>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Event</title>
            </Helmet>
            <div class="flex flex-col items-center mt-5">
                <div class="flex-auto w-full md:w-3/4 lg:w-4/5 lg:p-5">
                    <div className="flex lg:gap-8">
                        <div class="w-full lg:w-3/4 bg-white relative lg:rounded-t-xl">
                            <ProfileCover name={event.name} position={event.location} type='events'/>
                            <hr/>
                            
                            <div class="flex items-center">
                                <div class="w-2/3 mr-2">
                                    <div className='p-5'>
                                        <div className='leading-loose'>
                                            {isJoined && 
                                                <span id="badge-dismiss-yellow" class="inline-flex items-center mb-4 px-2 py-1 mr-2 text-sm font-medium text-yellow-800 bg-yellow-100 rounded dark:bg-yellow-900 dark:text-yellow-300">
                                                    You are already registered for this event.
                                                </span>
                                            }      

                                            {eventDaysDifference > 0 &&
                                                <div className="badge badge-error gap-2 mb-4">
                                                    Event Expired
                                                </div>
                                            } 

                                            {/* <div className='text-md font-extrabold' style={{color: '#b74700'}}>
                                                {eventDate.toLocaleDateString()}
                                            </div> */}
                                            <div className='mb-2'>
                                                Event by:
                                                <div className='font-extrabold' style={{color: '#266DD3'}}>
                                                    <Link to={`/profile/${event.creator}`}>
                                                        {profile.name}
                                                    </Link>
                                                </div>
                                            </div>
                                            <div class="flex items-center">
                                                <div class="w-[16px] mr-2">
                                                    <BsCalendarDate />
                                                </div>
                                                <div class="w-5/6">
                                                    {eventDateFormatted}
                                                </div>
                                            </div>
                                            <div>
                                                {event.members && event.members.length}&nbsp;
                                                {event.members && (event.members.length >= 0 && event.members.length <= 1) ? "member" : "members"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="w-1/3 text-right mr-3">
                                    {(isJoined) ?
                                    <>
                                    <form>
                                        <button onClick={leaveEvent} type="button" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                            Cancel Registration
                                        </button>
                                    </form>
                                    </>
                                    :
                                    <form>
                                        <button onClick={joinEvent} class={`py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${eventDaysDifference > 0 ? "cursor-not-allowed" : ""} `} disabled={eventDaysDifference > 0 ? true : false}>
                                            Register
                                        </button>
                                    </form>
                                    }
                                </div>
                            </div>
                            <hr />
                            
                            <div className='p-5'>
                                {event.description}
                            </div>
                        </div>
                        <SimilarEvents />

                    </div>
                </div>
            </div>
        </div>
    )
}