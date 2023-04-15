// My Connections component
// Author: Khalid Sadat
// Date created: March 2, 2023
// Description: Connections component for showing user's connections

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment';
import { RiSendPlaneFill } from 'react-icons/ri'
import profile_pic from '../../static/images/profile.jpg'
import { Link, useNavigate } from "react-router-dom";

export default function SimilarEvents() {

    const [events, setEvents] = useState([]);
    const getEvents = async () => {
        axios.get("/api/events/getAllEvents")
            .then(res => {
                setEvents(res.data)
                setIsLoading(false);

            }).catch(err => {
            console.log(err)
        })
    }

    useEffect (() => {
        getEvents();
    }, [])

    const navigate = useNavigate(); 

    const eventNavigate = (id) => {
        navigate(`/event/${id}`);
        window.location.reload();
      
    };

    // Getting only active events
    const today = moment().format('YYYY-MM-DD');
    const activeEvents = events.filter(event => moment(event.date).isAfter(today));

    // Showing only top two events
    const sortedEvents = [...activeEvents].sort((a, b) => a.date.localeCompare(b.date));
    const topTwoEvents = sortedEvents.slice(0, 2);
        
    return (
        <div class="w-1/4 hidden lg:block bg-white p-5 rounded-t-xl">
            <div className='mb-5'>
                <p className='text-lg font-semibold'>
                    Events near by
                </p>
            </div>

            {topTwoEvents.slice(0).reverse().map((event) => (
                <>
                <div className="flex mt-2 mb-3 w-full">
                    <div className="flex items-start">
                        <div className="flex flex-col ">
                            <p className="lg:text-md font-semibold">{event.name}</p>
                            <span className="text-sm">{event.location}</span>
                            
                            <button onClick={() => eventNavigate(event._id)} className="whiteBtn btn btn-sm bg-sky-400 font-light mt-3 w-[5rem]">
                                View
                            </button>
                            
                        </div>
                    </div>
                </div>
                <hr />
                </>
            ))}

        </div>
    )
}