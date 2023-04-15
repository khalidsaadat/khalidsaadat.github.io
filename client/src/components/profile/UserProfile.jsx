// User profile component
// Author: Khalid Sadat
// Date created: March 1, 2023
// Description: User profile components that is responsible for rendering all sub parts such as experience, education, skills, etc.

import React, { useEffect, useState } from "react";

import ProfileCover from "../profile/ProfileCover";
import HeadlineTop from "../profile/HeadlineTop";
import Experience from "../profile/Experience";
import Education from "../profile/Education";
import Skills from "../profile/Skills";
import Languages from "../profile/Languages";
import Projects from "../profile/Projects";

import Avatar from "../shared/Avatar";

export default function UserProfile(props) {
  var profile = props.user;
  let profile_id = profile._id;
  var profile_name = profile.name;

  var skills = profile.skills;
  var languages = profile.languages;

  var experiences = profile.experience;
  var educations = props.educations;
  var projects = profile.projects;

  // For Header Cover
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [date, setDate] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");

  useEffect(async () => {
    var occupations = await props.user.experience;

    occupations = occupations[occupations.length - 1];

    const pos_comma_split = occupations.indexOf(",");
    const company_comma_split = occupations.indexOf(",", pos_comma_split + 1);
    const date_comma_split = occupations.indexOf(",", company_comma_split + 1);
    const country_comma_split = occupations.indexOf(",", date_comma_split + 1);
    const description_comma_split = occupations.indexOf(
      ",",
      country_comma_split + 1
    );

    var position_str = occupations.substring(0, pos_comma_split);
    var company_str = occupations.substring(
      pos_comma_split + 1,
      company_comma_split
    );
    var date_str = occupations.substring(
      company_comma_split + 1,
      date_comma_split
    );
    var country_str = occupations.substring(
      date_comma_split + 1,
      country_comma_split
    );
    var description_str = occupations.substring(country_comma_split + 1);

    setPosition(position_str);
    setCompany(company_str);
    setDate(date_str);
    setCountry(country_str);
    setDescription(description_str);
  });

  return (
    <div class="w-full lg:w-3/4 bg-white relative lg:rounded-t-xl">
      <ProfileCover
        name={profile_name}
        position={position}
        company={company}
        userId={profile._id}
      />
      <HeadlineTop
        profile={profile}
        company={company}
        position={position}
        country={country}
        avatar={<Avatar userId={profile._id} />}
        getUser={props.getUser}
        isOwner={props.isOwner}
        userId={profile._id}
      />
      <hr />

      <Experience
        id={profile_id}
        experiences={experiences}
        getUser={props.getUser}
        isOwner={props.isOwner}
      />

      <Education
        id={profile_id}
        educations={educations}
        getUser={props.getUser}
        isOwner={props.isOwner}
      />

      <Skills
        id={profile_id}
        skills={skills}
        getUser={props.getUser}
        isOwner={props.isOwner}
      />

      <Languages
        id={profile_id}
        languages={languages}
        getUser={props.getUser}
        isOwner={props.isOwner}
      />

      <Projects
        id={profile_id}
        projects={projects}
        getUser={props.getUser}
        isOwner={props.isOwner}
      />
    </div>
  );
}
