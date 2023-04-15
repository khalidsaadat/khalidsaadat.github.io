import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../static/css/index.css";
import Sidebar from "../components/shared/Sidebar";
import CreatePost from "../components/feeds/CreatePost";
import FeedPosts from "../components/feeds/FeedPosts";

function Home() {
  var email = "";
  const [user, setUser] = useState([]);
  const navigate = useNavigate();
  const [getFeed, setFeed] = useState([]);

  const handleNewPost = (newPost) => {
    setFeed([newPost, ...getFeed]);
  };

  // checks if user is logged in, if not, redirects to login page
  React.useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "1") {
      navigate("/login");
    } else {
      email = localStorage.getItem("email");
    }
  }, []);

  useEffect(() => {
    axios
      .get("/api/account/userbymail?", {
        params: { email },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [profile, setProfile] = useState([]);
  const [user_skills, setSkills] = useState([]);

  const getUser = () => {
    axios
      .get("/api/account/userbymail?", {
        params: { email },
      })
      .then((res) => {
        setProfile(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    getFeeds();
  };

  const getFeeds = () => {
    const id = localStorage.getItem("uid");
    const feed = [];
    // get posts for user by his connections
    axios
      .get("/api/user/feed/getPersonalFeed", {
        params: { id: id },
      })
      .then((res) => {
        setFeed(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(async () => {
    setSkills(await profile.skills);
  });

  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Linkify</title>
      </Helmet>

      <div className="flex flex-col items-center mt-5 mx-auto">
        <div className="w-full">
          <div className="flex flex-col lg:flex-row">
            {/* Side Profile Bar */}
            <div className="w-full lg:w-1/4 px-2">
              <div className="flex justify-center">
                <Sidebar user_skills={user_skills} name={profile.name} userId={profile._id} />
              </div>
            </div>
            {/* Feed */}
            <div className="w-full lg:w-1/2 px-2">
              {/* Add the CreatePost component */}
              <div className="flex justify-center">
                <CreatePost onPostCreated={handleNewPost} />
              </div>
              <div className="w-full flex flex-col my-auto items-center bgimg bg-cover mb-12">
                {/* Add the FeedPosts component */}
                <FeedPosts
                  getFeed={getFeed}
                  currentUserId={localStorage.getItem("uid")}
                  getFeeds={getFeeds}
                />
              </div>
            </div>
            {/* Empty right-side section */}
            <div className="hidden lg:block lg:w-1/4 px-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
