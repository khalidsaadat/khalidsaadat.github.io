// Language component
// Author: Khalid Sadat
// Date created: March 9, 2023
// Description: languages component for showing the languages

import React, { useEffect, useState } from "react";
import { BiPencil } from "react-icons/bi";
import LanguageModal from "./modal/Language";

export default function Languages(props) {
  let id = props.id;
  // var user_skills = props.skills;
  const [user_languages, setLanguages] = useState([]);

  useEffect(async () => {
    setLanguages(await props.languages);
  });

  return (
    <div className="p-5">
      <div className="grid grid-col-2 mb-2 flex">
        <div class="grid grid-cols-2 gap-2 items-start">
          <div>
            <h1 className="text-xl font-semibold mb-5">Languages</h1>
          </div>
          <div className="flex">
            {props.isOwner && (
              <div style={{ marginLeft: "auto" }}>
                <label htmlFor="language-modal" className="">
                  <BiPencil className="cursor-pointer text-xl" />
                </label>
              </div>
            )}
          </div>
        </div>
        <LanguageModal
          id={id}
          languages={user_languages}
          getUser={props.getUser}
        />
        <div>
          {user_languages && user_languages.length == 0
            ? "No languages added yet"
            : ""}
          {user_languages &&
            Object.keys(user_languages).map((language_txt) => (
              <p>&bull; {user_languages[language_txt]}</p>
            ))}
          {/* {typeof(user_skills)} */}
        </div>
        <hr className="mt-5" />
      </div>
    </div>
  );
}
