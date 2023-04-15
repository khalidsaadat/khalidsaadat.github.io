// experience modal component
// Author: Khalid Sadat
// Date created: March 1, 2023
// Description: experience modal component for adding a new experience

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Buffer } from "buffer";

import { BiPencil } from "react-icons/bi";

export default function Experience(props) {
  var id = props.id;
  // let id = "63eabb9c07f2dc10446a1c7c";
  var experiences = props.experiences;

  const [position, setPosition] = useState("");
  const [companyName, setCommpanyName] = useState("");
  const [country, setCountry] = useState("");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  const [experience_added, setExperienceAdded] = useState('');
 

  const handlePosition = (e) => {
    const position = e.target.value;
    console.log(position);
    setPosition(position);
  };

  const handleMyCompany = (e) => {
    const company = e.target.value;
    console.log(company);
    setCommpanyName(company);
  };


  const handleCountry = (e) => {
    const country = e.target.value;
    console.log(country);
    setCountry(country);
  };
  
  const handleStartDate = (e) => {
    const start_date = e.target.value;
    console.log(start_date);
    setStartDate(start_date);
  }
  
  const handleEndDate = (e) => {
    const end_date = e.target.value;
    console.log(end_date);
    setEndDate(end_date);
  };
  
  const handleDescription = (e) => {
    const description = e.target.value;
    console.log(description);
    setDescription(description);
  };

  const addExperience = async (e) => {
    e.preventDefault();

    var token =
      "ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==";

    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const experienceStr = position + ", " + companyName + ", " + startDate + " - " + endDate + ", " + country + ", " + description; 
    const newExperience = { id: id, experience: experienceStr };

    await axios
      .post("/api/user/property/addExperience", newExperience, headers)
      .then((res) => {
        console.log("Adding", res);
        props.getUser();
        setExperienceAdded(1);
      })
      .catch((err) => console.log("Error", err));

    setPosition("");
    setCommpanyName("");
    setStartDate("");
    setEndDate("");
    setCountry("");
    setDescription("");
  };

  return (
    <div>
      <input type="checkbox" id="experience-modal" className="modal-toggle" />
      <div className="modal items-start pt-10">
        <div className="modal-box lg:w-3/5 max-w-5xl editProfileModal">
          <label
            htmlFor="experience-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 className="text-xl font-semibold mb-5">Edit Experiences</h1>
          <div>
            <form>
              <div className="">
                You can add your new experience here.
                <hr />
                <div className="mt-5">
                  {(experience_added == 1) &&
                    <div id="alert-1" class="flex p-4 mb-4 text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400" role="alert">
                        <svg aria-hidden="true" class="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Info</span>
                        <div class="ml-3 text-sm font-medium">
                            Experience added successfully
                        </div>
                        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-blue-50 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
                            <span class="sr-only">Close</span>
                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        </button>
                  </div>
                  }

                  <div className="grid md:grid-cols-2 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                      <label htmlFor="position" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                      <input type="text" id="position" value={position} onChange={handlePosition} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your position" required />
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <label htmlFor="companyh-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Company</label>
                      <input type="text" id="companyh-name" value={companyName} onChange={handleMyCompany} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your company name" required />
                    </div>
                  </div>

                  <div class="grid md:grid-cols-3 md:gap-6">
                    <div class="relative z-0 w-full mb-6 group">
                      <label htmlFor="start-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                      <input type="text" id="start-date" value={startDate} onChange={handleStartDate} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. May 2021" required />
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <label htmlFor="end-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End Date</label>
                      <input type="text" id="end-date" value={endDate} onChange={handleEndDate} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="e.g. Present" required />
                    </div>
                    <div class="relative z-0 w-full mb-6 group">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Country</label>
                      <input type="text" id="description" value={country} onChange={handleCountry} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter country name" required />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                      <textarea id="description" value={description} onChange={handleDescription} rows={4} className="block p-2.5 w-full text-sm text-gray-900  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Describe your position..." required />
                  </div>

                </div>
              </div>
              <button onClick={addExperience} className="primaryBtn btn mt-5">
                Add
              </button>
              {/* <input type="submit" /> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}