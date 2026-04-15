import React from "react";
import PostForm from "../components/PostForm";

function AddPost({user, handleAddPost}) {
  return (
    <div className="py-10">
      <PostForm user={user} handleAddPost={handleAddPost}/>
    </div>
  );
}

export default AddPost;
