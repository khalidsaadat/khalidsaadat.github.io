// Author: Jonathan Haddad
// Date created: March 29, 2023
/* Description: The CommentBox component enables users to submit comments on feed posts. It includes a form with a textarea and a submit button. Upon submission, the postComment function (passed as a prop) handles saving the comment to the database. This component enhances user engagement with the shared content on the platform. */

import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";

const CommentBox = ({ postId, postComment }) => {
  const [comment, setComment] = useState("");

  const handleCommentSubmit = () => {
    postComment(postId, comment);
    setComment("");
  };

  return (
    <div className="grid grid-cols-10 gap-3">
      <div className="col-span-9">
        <input
          type="text"
          placeholder="Write Comment..."
          className="input input-bordered input-sm w-full"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="grid place-items-center">
        <div>
          <button
            className="btn btn-circle btn-sm text-xl"
            onClick={handleCommentSubmit}
          >
            <RiSendPlaneFill />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
