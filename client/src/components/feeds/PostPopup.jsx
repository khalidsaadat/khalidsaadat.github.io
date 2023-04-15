// Author: Jonathan Haddad
// Date created: Mar 16, 2023
/* Description: a pop up screen where you can see more details about the post */


import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import profile_pic from '../../static/images/profile.jpg';
import CommentBox from './CommentBox';
import { IoClose } from 'react-icons/io5';
import ShowUserName from '../shared/ShowUserName';
import PositionName from '../shared/PositionName';

const PostPopup = ({ post, closePopup, postComment, currentUserId }) => {
  const serverBaseURL = 'http://localhost:8080'; // should be changed when deployed

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="relative bg-white p-6 w-full max-w-4xl rounded-lg pb-[6rem] md:pb-6">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={closePopup}
        >
          <IoClose size={24} />
        </button>
        <div className="flex flex-col md:flex-row gap-4">
          {post.image && (
            <div className="w-full md:w-1/2">
              <img
                src={`${serverBaseURL}/${post.image}`}
                alt="Post"
                className="w-full h-auto feed-image"
              />
            </div>
          )}
          <div className="w-full md:w-1/2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full">
                <img src={profile_pic} alt="Profile" />
              </div>
              <div className="flex flex-col pl-5">
                <Link to={`/profile/${post.poster}`}>
                  <p className="text-2xl">
                    <ShowUserName id={post.poster}/>
                  </p>
                </Link>
                <span className="text-xs">
                  <PositionName id={post.poster}/>
                </span>
              </div>
            </div>
            <div className="mt-5">
              <p className="text-gray-700 text-base">{post.description}</p>
              <p className="text-gray-600 text-xs mt-2">
                <span className='font-bold'>
                  {new Date(post.postedOn).toLocaleString("default", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </p>
            </div>
            <hr className="my-5" />
            <div className="overflow-y-scroll h-64">
              {post.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="text-gray-700 text-base mb-2 flex items-start space-x-2 px-4 py-2"
                >
                    {/* <span className="font-bold">
                      {comment.userId === currentUserId
                        ? "You"
                        :
                        <ShowUserName id={comment.userId}/>
                        }
                      :
                    </span>&nbsp;
                    {comment.comment} */}
                    <div className="rounded-[0.5rem] w-full bg-gray-200 px-3 py-2 inline-block mb-1">
                      <Link to={`/profile/${comment.userId}`}>
                        <div className="font-bold">
                          <ShowUserName id={comment.userId}/>
                        </div>
                      </Link>
                      <div className="text-sm">
                        {comment.comment}
                      </div>
                    </div>
                  <span className="text-gray-600 text-xs opacity-50 ml-2">
                    {new Date(comment.date).toLocaleString('default', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                
              ))}
            </div>
            <div className="mt-5">
              <CommentBox postId={post._id} postComment={postComment} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPopup;
