// evnts component
// Author: Khalid Sadat
// Date created: March 20, 2023
// Description: events page that is used for events.

import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Helmet } from 'react-helmet'
import axios from 'axios'
import profile_pic from "../static/images/profile.jpg";

import Sidebar from '../components/shared/Sidebar';
import ListSection from '../components/shared/ListSection';
import CardSkeleton from '../components/shared/CardSkeleton';

import MyGroupsSidebar from '../components/groups/MyGroupsSidebar';

function Groups() {
    
    // Loading
    const [isLoading, setIsLoading] = useState(true);
    const [groups, setGroups] = useState([]);

    const navigate = useNavigate();
    // checks if user is logged in, if not, redirects to login page
    useEffect(() => {
        if (localStorage.getItem("loggedIn") !== "1") {
            navigate("/login");
        }
    }, []);

    const getGroups = async () => {
        axios.get("/api/groups/getAllGroups")
            .then(res => {
                setGroups(res.data)
                setIsLoading(false);

            }).catch(err => {
            console.log(err)
        })
    }

    useEffect (() => {
        getGroups();
    }, [])

    
    
    return (
        <div className=''>
            <Helmet>
                <meta charSet='utf-8' />
                <title>Groups</title>
            </Helmet>
            <div class="flex flex-col items-center mt-5">
                <div class="flex-auto w-full md:w-3/4 lg:w-4/5 lg:p-5">
                    <div className="flex lg:gap-8">
                        
                        {/* Params: name, skills */}
                        <Sidebar name='Khalid Sadat' />

                        <div className="w-full w-full lg:w-3/4 bg-white relative lg:rounded-t-xl">
                            <div className="flex flex-col justify-between gap-3">
                                <h2 className="flex justify-center text-2xl font-bold md:text-3xl m-12">List of available groups</h2>
                            </div>
                            
                            {isLoading && <CardSkeleton cards={4}/>} 

                            {(groups.length == 0) && 
                            <>
                                <div className="flex flex-col justify-between gap-3">
                                    {/* <h2 className="flex justify-center text-2xl font-bold md:text-3xl m-12">List of available groups</h2> */}
                                    <div className='flex justify-center text-center'>
                                        <span className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                                No groups available yet to join. Please come back later.
                                            </p>
                                        </span>
                                    </div>
                                </div>
                            </>
                            }

                            {groups.slice(0).reverse().map((group)=> (
                                <div className=" items-center grid gap-5 my-2 md:grid-cols-2 lg:grid-cols-1 rounded-xl shadow dark:bg-gray-800 dark:border-gray-700 text-black max-w-screen-xl">
                                    <div className="flex flex-col justify-between gap-3 px-6 py-6 border border-gray-200 lg:flex-row group hover:border-black rounded-xl">
                                        <ListSection group={group} profile_pic={profile_pic} type='groups' />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <MyGroupsSidebar />

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Groups