// setup Avatar component
// Author: Jonathan Haddad
// Date created: Apr 1, 2023
// Description: allows user to upload an new avatar.



import React, { useState } from 'react';
import axios from 'axios';
import EditAvatar from './EditAvatar';
import { FaCamera } from 'react-icons/fa';

const SetupAvatar = ({ avatar, isOwner, getUser }) => {
  const [showEditor, setShowEditor] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = async (e) => {
    if (e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
      setShowEditor(true);
    }
  };

  const handleSave = async (imageDataURL) => {
    try {
      const response = await fetch(imageDataURL);
      const blob = await response.blob();
      const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
  
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('userId', localStorage.getItem('uid'));
  
      await axios.post('/api/user/property/addAvatar', formData);
      setShowEditor(false);
      setSelectedImage(null);
      getUser();
    } catch (error) {
      console.error('Error uploading image:', error.message);
    }
  };
  

  return (
    <>
      <div className="relative">
        {isOwner && (
          <label className="cursor-pointer absolute bottom-1 left-9 bg-none p-1 rounded-full bg-white">
            <input
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={handleImageChange}
            />
            <FaCamera className="" />
          
          </label>
        )}
      </div>
      {showEditor && (
        <EditAvatar
          image={selectedImage}
          onSave={handleSave}
          onCancel={() => setShowEditor(false)}
        />
      )}
    </>
  );
};

export default SetupAvatar;
