// Profile cover component
// Author: Khalid Sadat
// Date created: March 3, 2023
// Description: Project cover component for showing the the profile cover

import React, { useEffect, useState } from "react";
import profile_cover from "../../static/images/profile-cover.png";

export default function ProfileCover(props) {
  var name = props.name;
  var position = props.position;
  var company = props.company;
  var type = props.type;

  var heading_size = "3rem";
  if (type == "events") {
    heading_size = "2.5rem";
  }

  var pos_comp =
    position == undefined && company == undefined
      ? ""
      : position + (company == undefined ? "" : " | "  + company);

  return (
    <div>
      <img src={profile_cover} className="md:rounded-t-xl h-[11rem] w-full" />
      <div className="absolute top-[0rem] sm:top-[1.4 rem] lg:top-[1rem] pl-[1rem] py-2">
        {type == 'events' && (
          <>
            <h3
              className={`text-[1.4rem] md:text-[1.5rem] lg:text-[${heading_size}] text-white font-bold`}
            >
              {name}
            </h3>
            <p className="mt-0 lg:mt-2 text-[0.8rem] lg:text-lg text-gray-300">
              {pos_comp}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
