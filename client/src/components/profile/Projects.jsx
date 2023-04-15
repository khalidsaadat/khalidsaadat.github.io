// Projects component
// Author: Khalid Sadat
// Date created: March 3, 2023
// Description: projects component for showing the projects

import React, { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import localExperiences from "../../static/local_experience";
import ProjectModal from "./modal/Project";

import company_logo from "../../static/images/companies/google.png";

export default function Projects(props) {
  let id = props.id;
  // var user_skills = props.skills;
  const [projects, setProjects] = useState([]);

  useEffect(async () => {
    setProjects(await props.projects);
  });

  return (
    <div className="p-5">
      <div className="grid grid-col-2 mb-2 flex">
        <div class="grid grid-cols-2 gap-2 items-start">
          <div>
            <h1 className="text-xl font-semibold mb-5">Projects</h1>
          </div>
          <div className="flex">
            {props.isOwner && (
              <div style={{ marginLeft: "auto" }}>
                <label htmlFor="project-modal" className="">
                  <BiPencil className="cursor-pointer text-xl" />
                </label>
              </div>
            )}
          </div>
        </div>
        <ProjectModal id={id} projects={projects} getUser={props.getUser} />
        <div>
          {projects && projects.length == 0 ? "No projects added yet" : ""}
          {projects &&
            Object.keys(projects)
              .slice(0)
              .reverse()
              .map((proj) => {
                var project = projects[proj];
                const title_comma_split = project.indexOf(",");
                const date_comma_split = project.indexOf(
                  ",",
                  title_comma_split + 1
                );
                // const date_comma_split = experience.indexOf(',', (company_comma_split + 1));
                // const country_comma_split = experience.indexOf(',', (date_comma_split + 1));
                const description_comma_split = project.indexOf(
                  ",",
                  date_comma_split + 1
                );

                var title_str = project.substring(0, title_comma_split);
                // var company_str = experience.substring(pos_comma_split + 1, company_comma_split);
                var date_str = project.substring(
                  title_comma_split + 1,
                  date_comma_split
                );
                // var country_str = experience.substring(date_comma_split + 1, country_comma_split);
                var description_str = project.substring(date_comma_split + 1);

                return (
                  <div>
                    <div className="flex justify-left mt-2">
                      <div className="flex items-start">
                        <div className="flex flex-col">
                          <p className="text-lg lg:text-xl">{title_str}</p>
                          {/* <span className="text-sm">{company_str}</span> */}
                          <span className="text-xs mt-1">{date_str}</span>
                          {/* <span className='text-xs mt-1'>{country_str}</span> */}
                          <div className="mt-2">
                            <p className="text-s">{description_str}</p>
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
    </div>
  );
}
