// Mobile sidebar
// Author: Khalid Sadat
// Date created: March 2, 2023
// Description: for mobile sidebar

import React, { useEffect, useState } from "react";
import profile_pic from "../../static/images/profile.jpg";
import { Link, useNavigate } from "react-router-dom";
import { RiCalendarEventFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import { GrGroup } from 'react-icons/gr';
import { AiOutlineLogout } from 'react-icons/ai';
import { FaUserFriends } from 'react-icons/fa';

export default function MobileSidebar(props) {

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };
  
  var profile = props.profile;
  var profile_name = profile.name;
  var profile_id = profile._id;
  const [position, setPosition] = useState("");
  useEffect(async () => {
    var occupations = await props.profile.experience;
    occupations = occupations[occupations.length - 1];
    const pos_comma_split = occupations.indexOf(",");
    var position_str = occupations.substring(0, pos_comma_split);
    setPosition(position_str);
  });

  return (
    <div id="drawer-navigation" className="fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white dark:bg-gray-800" tabIndex={-1} aria-labelledby="drawer-navigation-label">
      
      <img src={profile_pic} alt="User profile" className="w-12 h-12 rounded-full" />
      <div className="text-[1.2rem] font-extrabold mt-2">
        {profile_name}
      </div>
      <div className="text-md">
        {position}
      </div>
      
      <button type="button" data-drawer-hide="drawer-navigation" aria-controls="drawer-navigation" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white">
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
        <span className="sr-only">Close menu</span>
      </button>

      <div className="py-4 overflow-y-auto">
        <ul className="space-y-2 font-medium">
          <li>
            <Link to={`/profile/${profile_id}`}>
              <span className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <FaUser />
                <span className="flex-1 ml-3 whitespace-nowrap">Profile</span>
              </span>
            </Link>
          </li>
          <li>
            <Link to={`/network`}>
              <span className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                <FaUserFriends />
                <span className="flex-1 ml-3 whitespace-nowrap">Network</span>
              </span>
            </Link>
          </li>
          <li>
            <button type="button" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdow-events-sidebar" data-collapse-toggle="dropdow-events-sidebar">
                <RiCalendarEventFill />
                <span class="flex-1 ml-3 text-left whitespace-nowrap">Events</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            <ul id="dropdow-events-sidebar" class="hidden py-2 space-y-2">
                  <li>
                    <Link to="/events/">
                      <span class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">All Event</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/events/create">
                      <span class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Create Event</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/events/my_events">
                      <span class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Created Events</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/events/registered_events">
                      <span class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Registered Events</span>
                    </Link>
                  </li>
            </ul>
          </li>
          <li>
            <button type="button" class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdow-groups-sidebar" data-collapse-toggle="dropdow-groups-sidebar">
                <GrGroup />
                <span class="flex-1 ml-3 text-left whitespace-nowrap">Groups</span>
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
            <ul id="dropdow-groups-sidebar" class="hidden py-2 space-y-2">
                  <li>
                    <Link to="/groups/">
                      <span class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">All Groups</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/groups/create">
                      <span class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Create Group</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/groups/my_groups">
                      <span class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Created Groups</span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/groups/joined_groups">
                      <span class="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Joined Groups</span>
                    </Link>
                  </li>
            </ul>
          </li>
          <hr />
          <li>
            <span onClick={logout} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <AiOutlineLogout />
              <span className="flex-1 ml-3 whitespace-nowrap">Logout</span>
            </span>
          </li>
        </ul>
      </div>
    </div>  
  )
}



