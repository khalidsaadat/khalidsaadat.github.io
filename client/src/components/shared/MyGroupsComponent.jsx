// My Connections component
// Author: Khalid Sadat
// Date created: March 2, 2023
// Description: Connections component for showing user's connections

import React, { useEffect, useState } from "react";
import { RiSendPlaneFill } from 'react-icons/ri'
import { BsCalendarDate } from 'react-icons/bs'
import { GrLocation } from 'react-icons/gr'
import profile_pic from '../../static/images/profile.jpg'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import moment from 'moment';

export default function MyGroupsComponent(props) {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Events
    const [location, setLocation] = useState('');
    const [event_date, setEventDate] = useState('');

    var type_redirect = '';

    if(props.type == 'groups') {
        useEffect (() => {
            var group = props.group;
            setId(group._id);
            setTitle(group.name);
            setDescription(group.description);
        })

        type_redirect = '/group/' + id;
    }
    else if(props.type == 'events') {
        useEffect (() => {
            var event = props.event;
            setId(event._id);
            setTitle(event.name);
            setDescription(event.description);
            setLocation(event.location);
            setEventDate(event.date);
        })

        var eventDate = new Date(event_date);
        var eventDateFormatted = moment(eventDate).utc().format('dddd, MMMM Do YYYY');

        type_redirect = '/event/' + id;
    }

    var yourString = "The quick brown fox jumps over the lazy dog"; //replace with your string.
    var maxLength = 40 // maximum number of characters to extract

    //trim the string to the maximum length
    var trimmedString = description.substring(0, maxLength);

    //re-trim if we are in the middle of a word
    trimmedString = trimmedString.substring(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(" ")))

  return (
    <>
    <div className="flex justify-left mt-2 mb-2">
        <div className="flex items-start">
            <div className="flex flex-col">
                <p className="lg:text-md font-semibold">{title}</p>
                <span className="text-sm mt-2">
                    {trimmedString} ...
                </span>
                {(props.type == 'events') && 
                <>
                <div class="flex items-center mt-2">
                    <div class="w-1/6">
                        <GrLocation />
                    </div>
                    <div class="w-5/6 text-sm" style={{color: '#1E429F'}}>
                        {location}
                    </div>
                </div>
                <div class="flex items-center mt-2">
                    <div class="w-1/6">
                        <BsCalendarDate />
                    </div>
                    <div class="w-5/6 text-sm" style={{color: '#4B5563'}}>
                        {eventDateFormatted}
                    </div>
                </div>
                </>
                }
                <Link to={type_redirect} className='whiteBtn btn btn-sm bg-sky-400 font-light mt-3 w-[5rem]'>
                    View
                </Link>
            </div>
        </div>
    </div>
    <hr className="mt-5 mb-5"/>
    </>
  )
}