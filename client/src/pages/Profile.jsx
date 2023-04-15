// profile component
// Author: Khalid Sadat
// Date created: March 1, 2023
// Description: profile component that shows all sub component of profile and also connections

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

import UserProfile from "../components/profile/UserProfile";
import MyConnections from "../components/profile/MyConnections";
import SimilarEvents from "../components/events/SimilarEvents";

function Profile() {
  const [profile, setProfile] = useState([]);
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  // checks if user is logged in, if not, redirects to login page
  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "1") {
      navigate("/login");
    }
  }, []);

  const getUser = async () => {
    if (localStorage.getItem("uid") === params.id) {
      setIsOwnProfile(true);
    }
    axios
      .get("/api/account/getUser?", {
        params: { id: params.id },
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [connectionsData, setConnectionsData] = useState([]);

  const getAllConnections = async () => {
      const res = await axios.get("/api/user/connection/getAllConnections?", {
        params: { userId: localStorage.getItem("uid") },
      });
      setConnectionsData(res.data);
  };
  
  const [educations, setEducations] = useState([]);

  const getMyEducations = async () => {
      const res = await axios.get("/api/user/property/getMyEducations?", {
        params: { id: params.id },
      });
      setEducations(res.data);
  };

  useEffect(() => {
      getUser();
      getAllConnections();
      getMyEducations();
  }, []);

  return (
    <div key={params.id}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>User Profile</title>
      </Helmet>
      <div class="flex flex-col items-center mt-5 mb-12">
        <div class="flex-auto w-full md:w-3/4 lg:w-4/5 lg:p-5">
          <div className="flex lg:gap-8">
            <UserProfile
              user={profile}
              educations={educations}
              getUser={getUser}
              isOwner={isOwnProfile}
            />
            <MyConnections connections={connectionsData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
