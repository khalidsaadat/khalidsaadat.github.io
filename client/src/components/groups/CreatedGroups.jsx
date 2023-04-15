// My Groups component
// Author: Khalid Sadat
// Date created: March 2, 2023
// Description: Groups component to show list of my groups.

import React, { useEffect, useState } from "react";
import profile_pic from '../../static/images/profile.jpg';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import { Helmet } from 'react-helmet'
import MyGroupsComponent from "../shared/MyGroupsComponent";

import { RiSendPlaneFill } from 'react-icons/ri';
import { IoCreateOutline } from 'react-icons/io5';
import Sidebar from "../shared/Sidebar";
import CardSkeleton from "../shared/CardSkeleton";
import ListSection from "../shared/ListSection";

export default function CreatedGroups() {

    const loggedInUserId = localStorage.getItem("uid");

    // Loading
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState([]);

    const getMyCreatedGroups = async () => {
        axios.get('/api/groups/myCreatedGroups?', {
            params: {memberId: loggedInUserId}
        })
        .then(res => {
            setGroups(res.data)
            setIsLoading(false);

        }).catch(err => {
        console.log(err)
        })
    }

    useEffect (() => {
        getMyCreatedGroups();
    }, [])

  return (
    <div className=''>
        <Helmet>
            <meta charSet='utf-8' />
            <title>Events</title>
        </Helmet>
        <div class="flex flex-col items-center mt-5">
            <div class="flex-auto w-full md:w-3/4 lg:w-4/5 lg:p-5">
                <div className="flex lg:gap-8">
                    
                    {/* Params: name, skills */}
                    <Sidebar name='Khalid Sadat' />

                    <div className="w-full w-full lg:w-3/4 bg-white relative lg:rounded-t-xl mb-20">
                        <div className="flex flex-col justify-between gap-3">
                            <h2 className="flex justify-center text-2xl font-bold md:text-3xl m-12">List of your created groups</h2>
                        </div>
                        
                        {isLoading && <CardSkeleton cards={4}/>} 

                        {(groups.length == 0) && 
                        <>
                            <div className="flex flex-col justify-between gap-3">
                                {/* <h2 className="flex justify-center text-2xl font-bold md:text-3xl m-12">List of available groups</h2> */}
                                <div className='flex justify-center text-center'>
                                    <span className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                        <p className="font-normal text-gray-700 dark:text-gray-400">
                                            You did not create any group yet. 
                                        </p>
                                        <br />
                                        <p>
                                            You can you create a new group by clicking Create Group button.
                                        </p>
                                        <br />
                                        <Link to="/groups/create">
                                            <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                Create Group
                                            </button>
                                        </Link>
                                    </span>
                                </div>
                            </div>
                        </>
                        }

                        {groups.slice(0).reverse().map((group) => (
                            <div className=" items-center grid gap-5 my-2 md:grid-cols-2 lg:grid-cols-1 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 text-black max-w-screen-xl">
                                <div className="flex flex-col justify-between gap-3 px-6 py-6 border border-gray-200 lg:flex-row group hover:border-black rounded-xl">
                                    <ListSection group={group} profile_pic={profile_pic} type='groups' />
                                </div>
                            </div>
                        ))}

                    </div>

                </div>
            </div>
        </div>
    </div>
  )
}