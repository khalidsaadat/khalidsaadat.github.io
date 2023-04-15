import React, {useEffect, useRef, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from '../shared/Avatar';
import VerifiedUser from '../profile/VerifiedUser';

import profile_pic from "../../static/images/profile.jpg";
import { FaSuitcase, FaComments, FaUserFriends, FaBell } from "react-icons/fa";

import logo from "../../static/images/logo.svg";
import logo_icon from "../../static/images/logo-icon.png";

function Navbar(props) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("uid");
    localStorage.removeItem("loggedIn");
    navigate("/login");


  };

  var profile = props.profile;

  const [searchResults, setSearchResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const isLoggedIn = localStorage.getItem("loggedIn");
  const uid = localStorage.getItem("uid");

  const searchResultsRef = useRef(null);


  const openUserProfile = (uid) => {
    navigate(`/profile/${uid}`);
    window.location.reload();
  }

  const handleUserClick = (uid) => {
    setSearchResults([]);
    navigate(`/profile/${uid}`);
    window.location.reload();

  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchResultsRef.current && !searchResultsRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchInputChange = async (e) => {
    const searchQuery = e.target.value;

    if (searchQuery.length === 0) {
      setSearchResults([]);
    } else {
      // Fetch users
      const results = await fetchUsers(searchQuery);
      setSearchResults(results);
    }
  };



  function SearchResults({ results, onUserClick }) {
    return (
        <div className="z-50 search-results bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-600 rounded-lg mt-2 p-4 absolute w-full">
          {results.map((user) => (
              <Link to={`/profile/${user._id}`} key={user._id} onClick={() => onUserClick(user._id)}>
                <div className="search-result flex items-center mb-2 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer transition duration-150">
                  <span className="w-8 h-8 rounded-full bg-gray-800">
                    <Avatar userId={user._id} />
                  </span>
                  <span className="ml-2 text-sm text-gray-700 dark:text-white">
                    <div className="flex items-center">
                        <div className="w-auto">
                            {user.name}
                        </div>
                        <VerifiedUser name={user.name} type='dms'/>
                    </div>
                  </span>
                </div>
              </Link>
          ))}
        </div>
    );
  }

  const fetchUsers = async (searchQuery) => {
    const response = await fetch(`/api/account/search?q=${searchQuery}`);
    const data = await response.json();
    return data;
  };

  return (
    <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
      <div className="md:container lg:container flex flex-wrap items-center justify-between mx-auto">
        
        {/* Logo */}
        <div className="dropdown">
          <Link to="/">
            <picture>
              <source media="(max-width: 390px)" srcSet={logo} className="h-10"/>
              <img className="h-10" src={logo} alt="Linkify" />
            </picture>

          </Link>
        </div>

        {isLoggedIn ? (
          <>
            {/* Search bar */}
            <div id="search_bar" className="">
              <div className="navbar-center">
                <div className="form-control w-full sm:w-[32rem] md:w-[30rem] lg:w-[47rem] ">
                  <form className="flex items-center">
                    <label htmlFor="simple-search" className="sr-only">
                      Search
                    </label>
                    <div className="relative w-full">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg
                          aria-hidden="true"
                          className="w-5 h-5 text-gray-500 dark:text-gray-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <input
                          autoComplete="off"
                          onChange={handleSearchInputChange}
                        type="text"
                        id="simple-search"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search on Linkify..."
                        required
                      />
                    </div>
                    {/* <button type="submit" className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      <span className="sr-only">Search</span>
                    </button> */}
                  </form>
                  <div className="relative" ref={searchResultsRef}>
                  {searchResults.length > 0 && (
                      <SearchResults results={searchResults} onUserClick={handleUserClick} />
                  )}
                  </div>
                </div>
              </div>
            </div>

            {/* Icons and dropdown */}
            <div className="flex items-center md:order-2" id="profile_dropdown">
              <div className="hidden md:block">
                <Link to="/Network">
                  <div
                    className="mr-2 btn btn-ghost btn-circle"
                    style={{ fontSize: "20px" }}
                  >
                    <FaUserFriends />
                  </div>
                </Link>
                <Link to="/messages">
                  <div
                    className="mr-2 btn btn-ghost btn-circle"
                    style={{ fontSize: "20px" }}
                  >
                    <FaComments />
                  </div>
                </Link>

                <Link to="/jobs">
                  <div
                    className="mr-2 btn btn-ghost btn-circle"
                    style={{ fontSize: "20px" }}
                  >
                    <FaSuitcase />
                  </div>
                </Link>

                <Link to="/notifications">
                <div
                    className="mr-2 btn btn-ghost btn-circle"
                    style={{ fontSize: "20px" }}
                  >
                    <FaBell />
                  </div>

                </Link>
              </div>

              <button
                type="button"
                className="hidden md:block w-10 h-10 flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded="false"
                data-dropdown-toggle="user-dropdown"
                data-dropdown-placement="bottom"
              >
                <Avatar userId={uid} />
              </button>

              {/* Dropdown menu */}
              <div className="z-50 hidden w-56 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                <div className="px-4 py-3">
                  <span className="block text-md font-bold text-gray-900 dark:text-white">{profile.name}</span>
                  <span className="block text-sm font-medium text-gray-500 truncate dark:text-gray-400">{profile.email}</span>
                </div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                  <li>
                    {/* <Link to={`/profile/${uid}`}> */}
                      <a onClick={() => openUserProfile(profile._id)} className="cursor-pointer block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
                        Profile
                      </a>
                    {/* </Link> */}
                  </li>
                  <li>
                    <button type="button" class="flex items-center w-full px-4 py-2 text-md text-gray-700 transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-navbar-events" data-collapse-toggle="dropdown-navbar-events">
                      <span class="flex-1 text-left whitespace-nowrap">Events</span>
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    <ul id="dropdown-navbar-events" class="hidden py-2 space-y-2">
                      <li>
                        <Link to="/events">
                          <span class="flex items-center text-sm w-full p-2 text-gray-700 transition duration-75 pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">All Events</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/events/create">
                          <span class="flex items-center text-sm w-full p-2 text-gray-700 transition duration-75 pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Create Event</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/events/my_events">
                          <span class="flex items-center text-sm w-full p-2 text-gray-700 transition duration-75 pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Created Event</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/events/registered_events">
                          <span class="flex items-center text-sm w-full p-2 text-gray-700 transition duration-75 pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Registered Event</span>
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <button type="button" class="flex items-center w-full px-4 py-2 text-md text-gray-700 transition duration-75 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-navbar-groups" data-collapse-toggle="dropdown-navbar-groups">
                      <span class="flex-1 text-left whitespace-nowrap">Groups</span>
                      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                    <ul id="dropdown-navbar-groups" class="hidden py-2 space-y-2">
                      <li>
                        <Link to="/groups">
                          <span class="flex items-center text-sm w-full p-2 text-gray-700 transition duration-75 pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">All Groups</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/groups/create">
                          <span class="flex items-center text-sm w-full p-2 text-gray-700 transition duration-75 pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Create Group</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/groups/my_groups">
                          <span class="flex items-center text-sm w-full p-2 text-gray-700 transition duration-75 pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Created Groups</span>
                        </Link>
                      </li>
                      <li>
                        <Link to="/groups/joined_groups">
                          <span class="flex items-center text-sm w-full p-2 text-gray-700 transition duration-75 pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">Joined Groups</span>
                        </Link>
                      </li>
                    </ul>
                  </li>

                  <hr className="my-4"/>
                  <li>
                    <a href="#" onClick={logout} className="block px-4 py-2 text-md text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Logout</a>
                  </li>
                </ul>
              </div>


            </div>

          </>
        ) : null}
      </div>
    </nav>
  );
}

export default Navbar;
