// Author: Jonathan Haddad
// Date created: March 29, 2023
/* Description: The FeedPosts component displays a list of feed posts fetched from the server. It renders the information for each post, such as the author's name, post description, and any associated images. Additionally, it supports interactivity by allowing users to like or remove likes from posts and add comments. The component leverages the useState and useEffect hooks for managing the state and side effects, providing an engaging user experience. */

import React, { useState } from "react";
import { AiOutlineLike, AiTwotoneLike } from "react-icons/ai";
import { MdOutlineInsertComment } from "react-icons/md";
import profile_pic from "../../static/images/profile.jpg";
import CommentBox from "./CommentBox";
import PostPopup from "./PostPopup";
import axios from "axios";
import PositionName from "../shared/PositionName"
import ShowUserName from "../shared/ShowUserName";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "../shared/Avatar";

function FeedPosts({ currentUserId, getFeed, getFeeds }) {

  const [comment, setComment] = useState("");
  const [showPostPopup, setShowPostPopup] = useState(null);
  const openPostPopup = (postId) => {
    setShowPostPopup(postId);
  };
  const postComment = async (postId, comment) => {
    try {
      const response = await axios.post("/api/user/feed/addComment", {
        id: postId,
        comment: {
          userId: localStorage.getItem("uid"),
          comment: comment,
          timestamp: new Date().toISOString(), // Add timestamp here
        },
      });

      if (response.status === 200) {
        console.log("Comment added successfully");
        setComment("");
        getFeeds(); // Refresh the feeds to show the new comment
      }
    } catch (error) {
      console.error("Error adding comment:", error.message);
    }
  };

  const addLike = async (postId) => {
    try {
      const response = await axios.post("/api/user/feed/addLike", {
        id: postId,
        like: localStorage.getItem("uid"),
      });

      if (response.status === 200) {
        console.log("Like added successfully");
        getFeeds(); // Refresh the feeds to show the updated likes
      }
    } catch (error) {
      console.error("Error adding like:", error.message);
    }
  };

  const removeLike = async (postId) => {
    try {
      const response = await axios.post("/api/user/feed/removeLike", {
        id: postId,
        like: localStorage.getItem("uid"),
      });

      if (response.status === 200) {
        console.log("Like removed successfully");
        getFeeds(); // Refresh the feeds to show the updated likes
      }
    } catch (error) {
      console.error("Error removing like:", error.message);
    }
  };

  const removeComment = async (postId, commentId) => {
    try {
      const response = await axios.post("/api/user/feed/removeComment", {
        postId,
        commentId,
      });

      if (response.status === 200) {
        console.log("Comment removed successfully");
        getFeeds(); // Refresh the feeds to show the updated comments
      }
    } catch (error) {
      console.error("Error removing comment:", error.message);
    }
  };
  const toggleLike = (postId, liked) => {
    if (liked) {
      removeLike(postId);
    } else {
      addLike(postId);
    }
  };

  const serverBaseURL = "http://localhost:8080"; // should be changed when deployed
  const isLikedByCurrentUser = (likes) => {
    return likes.some((like) => like === currentUserId);
  };

  return (
    <>
      {getFeed.map((feed) => (
        <div
          key={feed._id}
          className="sm:w-2/3 lg:w-4/5 p-5 mb-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-black"
        >
          <div className="flex items-center justify-left">
            <div className="flex items-center">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  {/* <img src={profile_pic} /> */}
                  <Avatar userId={feed.poster} />
                </div>
              </div>
              <div className="flex flex-col pl-5">
                <Link to={`/profile/${feed.poster}`}>
                  <p className="text-2xl">
                    <ShowUserName id={feed.poster}/>
                  </p>
                </Link>
                <span className="text-xs">
                  <PositionName id={feed.poster}/>
                </span>
                <span className="text-xs">
                  {new Date(feed.postedOn).toLocaleString("default", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex mt-5">
            <p className="text-gray-700 text-base">{feed.description}</p>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {}
            {JSON.parse(feed.tags).map((item) => (
              <span>#{item} </span>
            ))}
          </div>

          {/* Add the following img tag to display the image */}
          {feed.image && (
            <div className="mt-5">
              <img
                src={`${serverBaseURL}/${feed.image}`}
                alt="Feed"
                className="w-full h-auto cursor-pointer"
                onClick={() => openPostPopup(feed._id)}
              />
            </div>
          )}

          {/* start of like logic*/}
          <div className="mt-5">
            <div className="grid grid-col-2 mb-2">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <button
                    className={`flex items-center mb- ${
                      isLikedByCurrentUser(feed.likes)
                        ? "text-purple-500"
                        : "text-gray-400"
                    }`}
                    onClick={() =>
                      toggleLike(feed._id, isLikedByCurrentUser(feed.likes))
                    }
                  >
                    {isLikedByCurrentUser(feed.likes) ? (
                      <AiTwotoneLike />
                    ) : (
                      <AiOutlineLike />
                    )}
                    <label className="text-sm pl-2">{feed.likes.length}</label>
                  </button>
                </div>
                {/* end of like logic*/}

                <div className="text-right text-sm">
                  {feed.comments.length} Comments
                </div>
              </div>
            </div>
            <hr />
          </div>

          <div className="mt-5">
            {feed.comments
              .slice(Math.max(feed.comments.length - 3, 0))
              .map((comment) => (
                <div key={comment._id} className="mb-2">
                  <div className="rounded-[0.5rem] w-full bg-gray-200 dark:bg-gray-700 px-3 py-2 inline-block mb-1 opacity-75">
                    <Link to={`/profile/${comment.userId}`}>
                      <div className="font-bold">
                        <ShowUserName id={comment.userId}/>
                      </div>
                    </Link>
                    <div className="text-sm">
                      {comment.comment}
                    </div>
                  </div>
                  <div className="text-gray-600 text-xs opacity-50">
                    {/* Display date with hours and minutes */}
                    {new Date(comment.date).toLocaleString("default", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                  {comment.userId === currentUserId && (
                    <button
                      className="text-red-500 text-xs"
                      onClick={() => removeComment(feed._id, comment._id)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

            {feed.comments.length > 3 && (
              <div className="text-right">
                <button
                  className="btn btn-circle btn-sm text-xl"
                  onClick={() => openPostPopup(feed._id)}
                >
                  <MdOutlineInsertComment />
                </button>
              </div>
            )}
          </div>

          <div className="mt-5">
            <CommentBox postId={feed._id} postComment={postComment} />
          </div>
        </div>
      ))}
      {showPostPopup && (
        <PostPopup
          post={getFeed.find((feed) => feed._id === showPostPopup)}
          closePopup={() => setShowPostPopup(null)}
          postComment={postComment}
          currentUserId={currentUserId}
        />
      )}
    </>
  );
}
export default FeedPosts;
