// Education component
// Author: Khalid Sadat
// Date created: March 5, 2023
// Description: education component for showing user's education

import React, { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import EducationModal from "./modal/Education";
import default_education from "../../static/images/education/default_education.png";

export default function Education(props) {
  let id = props.id;
  const [educations, setEducations] = useState([]);

  useEffect(async () => {
    setEducations(await props.educations);
  });


  return (
    <div className="p-5">
      <div className="grid grid-col-2 mb-2 flex">
        <div class="grid grid-cols-2 gap-2 items-start">
          <div>
            <h1 className="text-xl font-semibold mb-5">Education</h1>
          </div>
          <div className="flex">
            {props.isOwner && (
              <div style={{ marginLeft: "auto" }}>
                <label htmlFor="education-modal" className="">
                  <BiPencil className="cursor-pointer text-xl" />
                </label>
              </div>
            )}
          </div>
        </div>
      </div>

      <EducationModal
        id={id}
        educations={educations}
        getUser={props.getUser}
      />

      <div>
        {educations && educations.length == 0 ? "No education added yet" : ""}
        {educations.slice(0).reverse().map(education => (
          <div>
            <div className="flex justify-left mt-2">
                <div className="flex items-start">
                    <div className='avatar'>
                        <div className="w-12">
                            <img src={default_education} className='eduLogo' />
                        </div>
                    </div>
                    <div className="flex flex-col pl-5">
                        <p className="text-lg lg:text-xl">{education.school}</p>
                        <span className="text-sm">
                          
                          {education.degree} • {education.fieldOfStudy}
                        
                        </span>
                        <span className='text-xs mt-1'>
                          {new Date(education.from).toLocaleString("default", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                          &nbsp;-&nbsp;
                          {new Date(education.to).toLocaleString("default", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                    </div>
                </div>
            </div>
            <hr className='mt-5' />
          </div>
        ))}
      </div>

      <hr className='mt-5'/>
    </div>
  );
}
