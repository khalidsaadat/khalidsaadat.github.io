import React, { useEffect, useState } from "react";
import profile_pic from "../../static/images/profile.jpg";
import Avatar from "./Avatar";
import VerifiedUser from "../profile/VerifiedUser";

export default function Sidebar(props) {
    var occupation = '';
    var name = props.name;
    const [user_skills, setUserSkills] = useState([]);
    
    
    
    useEffect(async () => {
        setUserSkills(await props.user_skills);
    });
    
    return (
        <div class="flex flex-items items-center hidden lg:block">
            <div className="w-[15rem]">
                <div className="card bg-base-100 shadow-xl p-5">
                    <figure className="px-10 pt-10">
                    {/* <img src={profile_pic} alt="Shoes" className="rounded-xl" /> */}
                    <Avatar userId={props.userId} type="sidebar"/>
                    </figure>
                    <div className="card-body items-center text-center">
                    <h2 className="card-title">
                        <div className="flex items-center">
                            <div className="w-auto">
                                {name}
                            </div>
                            <VerifiedUser name={name} />
                        </div>
                    </h2>
                    <div className="side-user-info">
                        <p>{occupation}</p>
                        {/* <p>My Company Inc.</p> */}
                    </div>
                    <hr />
                    <div className="side-user-info items-left">
                        <p>
                        {/* {user_skills && Object.keys(user_skills).map((skills_txt) => (
                            <span>{user_skills[skills_txt]}</span>
                        ))} */}
                        <p className="font-semibold">
                            {user_skills && user_skills.length != 0
                            ? "Skills"
                            : ""}
                        </p>

                        {user_skills &&
                            Object.keys(user_skills)
                            .map((skill) => user_skills[skill])
                            .join(", ")}
                        </p>
                        {/* {user_skills} */}
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
