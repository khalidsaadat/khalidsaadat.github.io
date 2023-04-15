import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/shared/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Jobs from "../pages/Jobs";
import Network from "../pages/Network";
import Notifications from "../pages/Notifications";
import Profile from "../pages/Profile";
import Messages from "../pages/Messages";
import Events from "../pages/Events";
import EventView from "../components/events/EventView";
import Groups from "../pages/Groups";
import GroupView from "../components/groups/GroupView";
import AuthRoutes from "./authRoutes";
import CreateGroup from "../components/groups/CreateGroup";
import MobileSidebar from "../components/mobile/MobileSidebar";
import MobileBottomBar from "../components/mobile/MobileBottomBar";
import CreateEvent from "../components/events/CreateEvent";
import CreatedEvents from "../components/events/CreatedEvents";
import RegisteredEvents from "../components/events/RegisteredEvents";
import JoinedGroups from "../components/groups/JoinedGroups";
import CreatedGroups from "../components/groups/CreatedGroups";

function RegularRoutes() {
  const [profile, setProfile] = useState([]);
  var isLoggedIn = localStorage.getItem("loggedIn");

  var email_s = "";
  email_s = localStorage.getItem("email");
  const getUser = async () => {
    axios
      .get("/api/account/userbymail?", {
        params: { email: email_s },
      })
      .then((res) => {
        setProfile(res.data);
      });
  };
  useEffect(() => {
    getUser();

    isLoggedIn = localStorage.getItem("loggedIn");
  }, []);

  return (
    <div>
      <Navbar profile={profile} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/Network" element={<Network />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route exact path="/profile/:id" element={<Profile />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:userIdStartDM/:userNameStartDM" element={<Messages />} />
        <Route path="/events" element={<Events />} />
        <Route path="/event/:eventId" element={<EventView />} />
        <Route path="/events/create" element={<CreateEvent />} />
        <Route path="/events/my_events" element={<CreatedEvents />} />
        <Route path="/events/registered_events" element={<RegisteredEvents />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/group/:groupId" element={<GroupView />} />
        <Route path="/groups/create" element={<CreateGroup />} />
        <Route path="/groups/my_groups" element={<CreatedGroups />} />
        <Route path="/groups/joined_groups" element={<JoinedGroups />} />
        <Route path="/test" element={<div>Hello from Test</div>} />
      </Routes>

      {/* Mobile menus at the bottom */}
      {isLoggedIn && (
        <>
          <MobileBottomBar />
          <MobileSidebar profile={profile}/>
        </>
      )}
    </div>
  );
}

export default RegularRoutes;
