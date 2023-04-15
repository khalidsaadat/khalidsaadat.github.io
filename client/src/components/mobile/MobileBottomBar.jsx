// Mobile sidebar
// Author: Khalid Sadat
// Date created: March 2, 2023
// Description: for mobile sidebar

import React from "react";

import { FaSuitcase, FaComments, FaBell } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function MobileBottomBar() {

  return (
    <div className="lg:hidden fixed z-50 w-full h-16 -translate-x-1/2 bg-white border border-gray-200 bottom-0 left-1/2 dark:bg-gray-700 dark:border-gray-600">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <Link to="/" className="inline-flex flex-col items-center justify-center">
          <button data-tooltip-target="tooltip-home" type="button" className="px-5 rounded-l-full group">
            <svg className="w-6 h-6 mb-1 text-black dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="sr-only">Home</span>
          </button>
        </Link>
        <Link to="/messages" className="inline-flex flex-col items-center justify-center">
          <button data-tooltip-target="tooltip-messages" type="button" className="px-5 group">
            <FaComments className="dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 text-[1.2rem]"/>
            <span className="sr-only">Messages</span>
          </button>
        </Link>

        <Link to="/jobs" className="inline-flex flex-col items-center justify-center">
          <button data-tooltip-target="tooltip-jobs" type="button" className="px-5 group">
            <FaSuitcase className="dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 text-[1.2rem]"/>
            <span className="sr-only">Jobs</span>
          </button>
        </Link>

        <Link to="/notifications" className="inline-flex flex-col items-center justify-center">
          <button data-tooltip-target="tooltip-notifications" type="button" className="px-5 group">
            <FaBell className="dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500 text-[1.2rem]"/>
            <span className="sr-only">Notifications</span>
          </button>
        </Link>
       
        <button data-tooltip-target="tooltip-profile" type="button" className="px-5 rounded-r-full group" data-drawer-target="drawer-navigation" data-drawer-show="drawer-navigation" aria-controls="drawer-navigation">
          <svg className="w-6 h-6 mb-1 text-black dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path clipRule="evenodd" fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" />
          </svg>
          <span className="sr-only">Profile</span>
        </button>
      
      </div>
    </div>
  )
}



