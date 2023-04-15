// Avatar component
// Author: Jonathan Haddad
// Date created: Apr 1, 2023
// Description: view avatar




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import profile_pic from "../../static/images/profile.jpg";

const Avatar = ({ userId, type }) => {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [userName, setUserName] = useState('');
  const [isInvalidUser, setIsInvalidUser] = useState(false);

  const fetchAvatar = async () => {
    if (userId) {
      try {
        const res = await axios.get(`/api/account/getUser?id=${userId}`);
        const avatarPath = res.data.avatar;
        const name = res.data.name;
        setAvatarUrl(avatarPath);
        setUserName(name);
      } catch (error) {
        setIsInvalidUser(true);
        console.error("Error fetching avatar:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, [userId]);

  const getInitials = (name) => {
    if (!name) return '';
    return name
      .split(' ')
      .slice(0, 2)
      .map((part) => part.charAt(0).toUpperCase())
      .join('');
  };
  
  var imageUrl;

  

  if(isInvalidUser == true) {
    imageUrl = profile_pic;
  }
  else {
    imageUrl = avatarUrl && `http://localhost:8080/${avatarUrl}`;
  }

  if(type == 'sidebar' && !imageUrl) {
    imageUrl = profile_pic;
  }

  return (
    <div className={`rounded-full flex items-center justify-center text-2xl font-bold text-white`}>
      {imageUrl ? (
        <img src={imageUrl} alt="Profile Avatar" className={`rounded-full`} />
      ) : (
        getInitials(userName)
      )}
    </div>
  );
};

export default Avatar;
