// Create event component
// Author: Khalid Sadat
// Date created: March 25, 2023
// Description: Create event component to create a new event

import React, { useEffect, useState } from "react";
import { Helmet } from 'react-helmet'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Datepicker from 'flowbite-datepicker/Datepicker';
import moment from 'moment';

import profile_pic from '../../static/images/profile.jpg';
import { RiSendPlaneFill } from 'react-icons/ri';
import { IoCreateOutline } from 'react-icons/io5';

import Sidebar from "../shared/Sidebar";

export default function CreateEvent() {

    const loggedInUserId = localStorage.getItem("uid");

    // Loading
    const [isLoading, setIsLoading] = useState(true);

    // Group
    const [groups, setGroups] = useState([]);
    const [isCreated, setIsCreated] = useState(false);
    
    const [date, setDate] = useState('');
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState(false);
    
    const handleDate = (e) => {
        const date = e.target.value;
        console.log(date);
        setDate(date);
    }
    useEffect(() => {
    const datepickerEl = document?.getElementById("event-date");
    // console.log(datepickerEl);
    new Datepicker(datepickerEl, {});
    }, []);

    const handleName = (e) => {
        const event_name = e.target.value;
        setName(event_name);
    }
    
    const handleDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    }

    const handleLocation = (e) => {
        const location = e.target.value;
        setLocation(location);
    }

    const handleStatus = (e) => {
        const status = e.target.checked;
        setStatus(status);
    }


    const createEvent = async (e) => {
        e.preventDefault();
        
        var token = 'ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==';
        
        const headers = {
            'Content-Type': 'application/json; charset=UTF-8',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        }
   
        const newEvent = {name: name, description: description, creator: loggedInUserId, status: status, date: date, location: location};
        console.log(newEvent);

        await axios.post('/api/events/createEvent', newEvent, headers)
        .then((res) => {
            console.log("Event created", res);
            setIsCreated(true);
        })
        .catch(err => console.log('Error', err))

        setName("");
        setDescription("");
        setStatus(false);
        setDate("");
        setLocation("");
    }

  return (
    <div className=''>
        <Helmet>
            <meta charSet='utf-8' />
            <title>Create Group</title>
        </Helmet>
        <div class="flex flex-col items-center mt-5">
            <div class="flex-auto w-full md:w-3/4 lg:w-4/5 lg:p-5">
                <div className="flex lg:gap-8">
                    
                    {/* Params: name, skills */}
                    <Sidebar name='Khalid Sadat' />

                    <div className="w-full w-full lg:w-3/4 bg-white relative lg:rounded-t-xl p-5">

                        {/* <div className="flex flex-col justify-between gap-3">
                            <h2 className="flex justify-center text-2xl font-bold md:text-3xl m-12">Create a new group</h2>
                        </div> */}
                        <nav className="flex mb-10 ml-12 mt-3" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                        <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                                        Home
                                    </Link>
                                    </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                        <Link to="/events" className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Events</Link>
                                    </div>
                                </li>
                                <li aria-current="page">
                                    <div className="flex items-center">
                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                        <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">Create Event</span>
                                    </div>
                                </li>
                            </ol>
                        </nav>


                        <div>
                            <h2 className="text-2xl font-bold flex justify-center md:text-3xl">Create a new event</h2>
                        </div>

                        


                        {isCreated == true && 
                            <div class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                                <span class="font-medium">Event created successfully.</span>
                            </div>
                        }
                        
                        <div className="m-12 mb-20">
                            <form autoComplete="off">
                                <div className="relative mb-6">
                                    <label htmlFor="event-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Date</label>
                                    <input
                                        datepicker
                                        datepicker-autohide
                                        datepicker-format="yyyy/mm/dd"
                                        type="text"
                                        minDate={moment().toDate()}
                                        className="border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                        placeholder="Select your event date"
                                        value={date}
                                        onSelect={(e) => handleDate(e)}
                                        // onClick={(e) => dobHandler(e)}
                                        // onClick={(e) => console.log(e.target.value)}
                                        // onChange={(e) => console.log(e)}
                                        id="event-date"
                                    />
                                    <div className="flex absolute right-0 items-center pr-3 pointer-events-none" style={{top: '26px', bottom: '0px'}}>
                                        <svg
                                            aria-hidden="true"
                                            class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                            fill-rule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clip-rule="evenodd"
                                            ></path>
                                        </svg>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="event-namae" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                    <input type="text" id="event-namae" value={name} onChange={handleName} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your event name" required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="event-location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Location</label>
                                    <input type="text" id="event-location" value={location} onChange={handleLocation} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your event name" required />
                                </div>
                                <div className="mb-6">
                                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                                    <textarea id="description" value={description} onChange={handleDescription} rows={4} className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Describe your event..." required />
                                </div>
                                <div className="">
                                    
                                </div>
                                <div className="flex mb-6">
                                    <div className="flex items-center h-5">
                                        <input id="status-active" onChange={handleStatus} checked={status} aria-describedby="status-active-text" type="checkbox" defaultValue className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    </div>
                                    <div className="ml-2 text-sm">
                                        <label htmlFor="status-active" className="font-medium text-gray-900 dark:text-gray-300">Active</label>
                                        <p id="status-active-text" className="text-xs font-normal text-gray-500 dark:text-gray-300">
                                            Active Status: This event will be active and users can register for it anytime.
                                        </p>
                                    </div>
                                </div>

                                <button onClick={createEvent} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Create
                                </button>
                            </form>

                        </div>

                    </div>
                    

                </div>
            </div>
        </div>

        
    </div>
  )
}