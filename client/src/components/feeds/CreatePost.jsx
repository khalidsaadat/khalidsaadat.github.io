// Author: Jonathan Haddad
// Date created: March 29, 2023
/* Description: The CreatePost component allows users to create new feed posts. It includes a form with fields for entering a description, selecting tags, and uploading an image. When the form is submitted, the handleSubmit function processes the input data and sends it to the server for storage. This component contributes to the dynamic nature of the platform by enabling users to share their thoughts and experiences. */

import React, { useState } from "react";
import axios from "axios";
import { BiImageAdd } from "react-icons/bi";
import 'flowbite';

const CreatePost = ({ onPostCreated }) => {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSubmit = async () => {
    setMessage(null);
    const userId = localStorage.getItem("uid");

    const regex = /#(\w+)/g;
    const tags = Array.from(description.matchAll(regex)).map(
      (match) => match[1]
    );
    const descriptionWithoutTags = description.replace(regex, "").trim();

    // Prepare form data for image upload
    const formData = new FormData();
    formData.append("description", descriptionWithoutTags);
    formData.append("tags", JSON.stringify(tags));
    formData.append("userId", userId);
    if (image) {
      formData.append("file", image);
    }

    axios
      .post("/api/user/feed/postFeed", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setMessage("Post created successfully.");
        setDescription("");
        setImage(null);
        onPostCreated(res.data); 
      })
      .catch((err) => {
        console.log(err);
        setMessage("Error creating post: " + err.message);
      });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="w-full sm:w-2/3 md:w-2/3 lg:w-11/12 bg-white p-4 rounded-lg shadow mb-6">
      <input
        className="w-full border border-gray-300 p-2 rounded-lg focus:border-blue-500 focus:outline-none mb-2"
        type="text"
        placeholder="Description with hashtags (e.g. #example)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="flex justify-between items-center">
        <label
          className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2 mb-2"
        >
          <BiImageAdd className="text-lg" />
          <input
            type="file"
            name="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
        </label>
        {image && <span className="mr-2">{image.name}</span>}
        <button
          className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2 mb-2"
       
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
      {message && (
        <p
          className={
            message.startsWith("Error") ? "text-red-600" : "text-green-600"
          }
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default CreatePost;
