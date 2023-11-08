import React, { useState } from "react";
<<<<<<< Updated upstream
import { Comment } from "@/components/comment/comment";
import styles from "./reviewpage.module.css";
import { Button, Input } from "antd";
=======
import {Comment} from '@/components/comment'
import styles from "./commentpage.module.css";
import {Button,Input} from 'antd';
>>>>>>> Stashed changes

// This is used for texat area input
const { TextArea } = Input;

const CommentPage = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  return (
    <div className={styles.layout}>
      <h1>Comment Page</h1>
      <Comment></Comment>
      <div>
        <TextArea
          showCount
          maxLength={100}
          style={{ height: 120, resize: "none" }}
          placeholder="what do you want other students to know about this professor?"
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button onClick={handleAddComment}>Add Comment</Button>
      </div>

      <div >
        {comments.map((comment, index) => (
<<<<<<< Updated upstream
          <div key={index}>{comment}</div>
=======

          <div className={styles.box} key={index}>{comment}</div>

>>>>>>> Stashed changes
        ))}
      </div>
    </div>
  );
};

export default CommentPage;
<<<<<<< Updated upstream
=======


{/* <div>
  1. circle
   1-1 image
   1-2 how do i put image
   1-3 image in a circle
  2. name
  3. time
  4. box background
  5. text-inside
</div> */}
>>>>>>> Stashed changes
