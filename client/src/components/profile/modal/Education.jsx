// experience modal component
// Author: Khalid Sadat
// Date created: March 1, 2023
// Description: experience modal component for adding a new experience

import axios from "axios";
import React, { useEffect, useState } from "react";
import Datepicker from 'flowbite-datepicker/Datepicker';
import moment from 'moment';


export default function Education(props) {
  var id = props.id;
  // let id = "63eabb9c07f2dc10446a1c7c";
  var educations = props.educations;

  const [school, setSchool] = useState("");
  const [degree, setDegree] = useState("");
  const [fieldOfStudy, setFieldOfStudy] = useState("");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState("");

  const handleSchoolName = (e) => {
    const school_name = e.target.value;
    console.log(school_name);
    setSchool(school_name);
  };
  const handleDegree = (e) => {
    const degree = e.target.value;
    console.log(degree);
    setDegree(degree);
  };
  const handleFieldOfStudy = (e) => {
    const field_of_study = e.target.value;
    console.log(field_of_study);
    setFieldOfStudy(field_of_study);
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
  
  const addEducation = async (e) => {
    e.preventDefault();

    var token =
      "ewogICAgdXNlcm5hbWU6ICJraGFsaWRAdGVzdC5jb20iLAogICAgcGFzc3dvcmQ6ICJwYXNzMSIKfQ==";

    const headers = {
      "Content-Type": "application/json; charset=UTF-8",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const newEducation = { id: id, school: school, degree : degree, fieldOfStudy: fieldOfStudy, from : startDate, to: endDate };
    console.log(newEducation);

    await axios
      .post("/api/user/property/addEducation", newEducation, headers)
      .then((res) => {
        console.log("Adding", res);
        props.getUser();
      })
      .catch((err) => console.log("Error", err));

    setSchool("");
    setDegree("");
    setFieldOfStudy("");
    setStartDate("");
    setEndDate("");
  };

  return (
    <div>
      <input type="checkbox" id="education-modal" className="modal-toggle" />
      <div className="modal items-start pt-10">
        <div className="modal-box lg:w-3/5 max-w-5xl editProfileModal">
          <label
            htmlFor="education-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 className="text-xl font-semibold mb-5">Edit Education</h1>
          <div>
            <form autoComplete="off">
              <div className="">

                <div className="">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="inline-full-name"
                  >
                    New Education
                  </label>
                </div>
                <div className="">

                  <div className="mb-6">
                    <label htmlFor="school-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School Name</label>
                    <input type="text" id="school-name" value={school} onChange={handleSchoolName} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your event name" required />
                  </div>

                  <div className="mb-6">
                    <div class="flex space-x-4">
                      <div class="w-1/2 ">
                        <div className="">
                          <label htmlFor="degree" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Degree</label>
                          <input type="text" id="degree" value={degree} onChange={handleDegree} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your event name" required />
                        </div>
                      </div>
                      <div class="w-1/2 ">
                        <div>
                          <label htmlFor="field-of-study" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Field of Study</label>
                          <input type="text" id="field-of-study" value={fieldOfStudy} onChange={handleFieldOfStudy} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your event name" required />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div class="flex space-x-4">
                      <div class="w-1/2 ">
                        <div className="">
                          <label htmlFor="start-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start Date</label>
                          <input type="text" id="start-date" value={startDate} onChange={handleStartDate} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your event name" required />
                        </div>
                      </div>
                      <div class="w-1/2 ">
                        <div>
                          <label htmlFor="end-date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Graduation Date</label>
                          <input type="text" id="end-date" value={endDate} onChange={handleEndDate} className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your event name" required />
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
              <button onClick={addEducation} className="primaryBtn btn mt-5">
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