// Experience component
// Author: Khalid Sadat
// Date created: Feb 20, 2023
// Description: experience component for showing user's experiences

import React, { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import localExperiences from "../../static/local_experience";
import ExperienceModal from "./modal/Experience";

import company_logo from "../../static/images/companies/default_company.png";

export default function Experience(props) {
  let id = props.id;
  // var user_skills = props.skills;
  const [experiences, setExperiences] = useState([]);

  useEffect(async () => {
    setExperiences(await props.experiences);
  });

  return (
    <div className="p-5">
      <div className="grid grid-col-2 mb-2 flex">
        <div class="grid grid-cols-2 gap-2 items-start">
          <div>
            <h1 className="text-xl font-semibold mb-5">Experience</h1>
          </div>
          <div className="flex">
            {props.isOwner && (
              <div style={{ marginLeft: "auto" }}>
                <label htmlFor="experience-modal" className="">
                  <BiPencil className="cursor-pointer text-xl" />
                </label>
              </div>
            )}
          </div>
        </div>
        <ExperienceModal
          id={id}
          experience={experiences}
          getUser={props.getUser}
        />
        <div>
          {experiences && experiences.length == 0 ? "No experience added yet" : ""}
          {experiences &&
            Object.keys(experiences)
              .slice(0)
              .reverse()
              .map((exp) => {
                var experience = experiences[exp];
                const pos_comma_split = experience.indexOf(",");
                const company_comma_split = experience.indexOf(
                  ",",
                  pos_comma_split + 1
                );
                const date_comma_split = experience.indexOf(
                  ",",
                  company_comma_split + 1
                );
                const country_comma_split = experience.indexOf(
                  ",",
                  date_comma_split + 1
                );
                const description_comma_split = experience.indexOf(
                  ",",
                  country_comma_split + 1
                );

                var position_str = experience.substring(0, pos_comma_split);
                var company_str = experience.substring(
                  pos_comma_split + 1,
                  company_comma_split
                );
                var date_str = experience.substring(
                  company_comma_split + 1,
                  date_comma_split
                );
                var country_str = experience.substring(
                  date_comma_split + 1,
                  country_comma_split
                );
                var description_str = experience.substring(
                  country_comma_split + 1
                );

                return (
                  <div>
                    <div className="flex justify-left mt-2">
                      <div className="flex items-start">
                        <div className="avatar">
                          <div className="w-12">
                            <img src={company_logo} className='eduLogo'/>
                          </div>
                        </div>
                        <div className="flex flex-col pl-5">
                          <p className="text-lg lg:text-xl">{position_str}</p>
                          <span className="text-sm">{company_str}</span>
                          <span className="text-xs mt-1">{date_str}</span>
                          <span className="text-xs mt-1">{country_str}</span>
                          <div className="mt-2">
                            <p className="text-s">- {description_str}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="mt-5" />
                  </div>
                );
              })}
        </div>
      </div>
      <hr className='mt-5'/>
    </div>
  );
}
