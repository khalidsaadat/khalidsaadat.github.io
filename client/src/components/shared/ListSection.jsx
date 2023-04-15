import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from 'moment';

function ListSection(props) {
    // Common attributes
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    // Jobs attributes
    const [job_company, setJobCompany] = useState('');
    const [job_salary, setJobSalary] = useState('');

    // Events attributes
    const [event_date, setEventDate] = useState('');

    //
    var type_host = '';
    var type_price_date = '';
    var type_redirect_url = '';
    var type_submit_button = '';

    if(props.type == 'jobs' && props.job != undefined) {
        useEffect (() => {
            var job = props.job;
            setId(job._id);
            setTitle(job.title);
            setJobCompany(job.company);
            setJobSalary(job.salary);
            setLocation(job.location);
            setDescription(job.description);
        })
    }
    else if(props.type == 'events') {
        useEffect (() => {
            var event = props.event;
            setId(event._id);
            setTitle(event.name);
            setLocation(event.location);
            setDescription(event.description);
            setEventDate(event.date);
        })
    }
    else if(props.type == 'groups') {
        useEffect (() => {
            var group = props.group;
            setId(group._id);
            setTitle(group.name);
            setDescription(group.description);
        })
    }

    if(props.type == 'jobs') {
        type_host = job_company;
        type_price_date = job_salary;
        type_redirect_url = '/';
        type_submit_button = 'Apply';
    }
    else if(props.type == 'events') {
        type_host = location;
        var eventDate = new Date(event_date);
        var eventDateFormatted = moment(eventDate).utc().format('dddd, MMMM Do YYYY');

        var eventDateMoment = moment(eventDate);
        var currentDateMoment = moment(new Date());
        var eventDaysDifference = currentDateMoment.diff(eventDateMoment, "days");

        type_price_date = eventDateFormatted;
        type_redirect_url = '/event/' + id;
        type_submit_button = 'View More';
    }
    else if(props.type == 'groups') {
        type_redirect_url = '/group/' + id;
        type_submit_button = 'View More';
    }

    // Trimming description properly
    var maxLength = 50 // maximum number of characters to extract

    //trim the string to the maximum length
    var trimmedDescription = description.substring(0, maxLength);

    //re-trim if we are in the middle of a word
    if(description.length > 50) {
        trimmedDescription = trimmedDescription.substring(0, Math.min(trimmedDescription.length, trimmedDescription.lastIndexOf(" "))) + " ...";
    }


    return (
        <div className="flex flex-col items-start flex-1 gap-5 lg:flex-row">
            <div className="flex-1 items-initial lg:text-start">
                <div class="flex items-center">
                    <div class="w-2/3">
                        <h3 className="text-lg font-semibold mb-1">{title}</h3>
                    </div>
                    <div class="w-1/3 flex justify-end">
                        {eventDaysDifference > 0 && 
                            <div className="badge badge-error gap-2 mb-4">
                                Event Expired
                            </div>
                        }
                    </div>
                </div>
                <div>
                    {props.type != 'groups' &&
                    <>
                        <span className="text-green-500">{type_host}</span>
                        <span className='pl-2 pr-2'>•</span>
                        <span className='jobs-salary'>{type_price_date}</span>
                    </>
                    }
                    
                    <span className={"jobs-location " + ((props.type == 'events') ? 'hidden' : '')}>{location}</span>

                    <div className='jobs-description pt-5'>
                        {trimmedDescription}
                    </div>
                </div>
                <div className='pt-5 text-right'>
                    <Link to={type_redirect_url}>
                        <a className="px-6 py-2 text-white font-semibold duration-150 transform border border-white rounded-full hover:bg-blue-800 bg-indigo-400 group-hover:border-transparent">
                            {type_submit_button}
                        </a>
                    </Link>
                </div>
                
            </div>
        </div>
    );
}

export default ListSection;
