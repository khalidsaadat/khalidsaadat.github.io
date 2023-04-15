//Notifications
//Author: Daria Koroleva
//Created: Feb 11,2023
//Description: Notifications page
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Notification from '../components/notifications/Notification';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Notifications() {

  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  // checks if user is logged in, if not, redirects to login page
  useEffect(() => {
    if (localStorage.getItem("loggedIn") !== "1") {
      navigate("/login");
    }
  }, []);

  const currentUser = localStorage.getItem("uid");

  useEffect(() => {
    axios.get(`/api/notifications/user/${currentUser}`)
      .then((res) => {
        // handle the response data        
        setNotifications(mapNotificationsToUI(res.data));
      })
      .catch((err) => {
        // handle any errors
        console.log(err);
      });

  }, []);


  function mapNotificationsToUI(notificationsData) {

    const notificationsUI = notificationsData.map((notification) => {
      return {
        id: notification._id,
        age: getAge(notification.time),
        userName: notification.userPosterId?.name,
        userId: notification.userPosterId?._id,
        type: notification.type,
        description: notification.description        
      }

    });

    return notificationsUI;
  }

  function getAge(time) {
    const current = new Date();
    const datetime = new Date(time);

    const difference = current - datetime;

    const sec = 1000;
    const min = 60 * sec;
    const hour = 60 * min;
    const day = 24 * hour;
    const week = 7 * day;

    if (difference < min) {
      return `${Math.round(difference / sec)}s`;
    }
    else if (difference < hour) {
      return `${Math.round(difference / min)}m`;
    }
    else if (difference < day) {
      return `${Math.round(difference / hour)}h`;
    }
    else if (difference < week) {
      return `${Math.round(difference / day)}d`;
    }
    else {
      return `${Math.round(difference / week)}w`;
    }

  }

  const deleteNotificationById = async (notificationId) => {
    await axios
      .delete(`/api/notifications/deleteNotification/${notificationId}`)
      .then(() => {
        setNotifications(notifications.filter(notification => notification.id != notificationId));
      })
      .catch((err) => console.log("Error", err));
  };

  function removeNotification(notificationId) {
    deleteNotificationById(notificationId);
  }

  return (
    <div>
      <Helmet>
        <meta charSet='utf-8' />
        <title>Notifications</title>
      </Helmet>
      <div className="flex flex-col h-screen my-auto items-center bgimg bg-cover w-full mb-[6rem]">
        <div className="w-full sm:w-1/2">
          <ul className="min-w-full pb-16">
            {notifications.map((notification) => {
              return (
                <li className='flex items-center justify-center' key={notification.id} >
                  <Notification notification={notification} removeNotification={removeNotification}></Notification>
                </li>
              )
            })}
          </ul>

        </div>

      </div>

    </div>
  )
}

export default Notifications