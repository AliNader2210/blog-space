import React from "react";
import PostForm from "../components/PostForm";
import { Link, useParams } from "react-router";

function EditPost({ posts, user, handleEditPost, initialDataLoading }) {
  const { id } = useParams();

  const postToBeEdited = posts.find((post) => post.id === id);

  if (!postToBeEdited) {
    return (
      <div className="my-50 flex flex-col items-center gap-7">
        <p className="text-error text-3xl md:text-5xl text-center">
          Post not found.
        </p>
        <Link to="/" className="btn btn-neutral">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10">
      <PostForm
        postToBeEdited={postToBeEdited}
        user={user}
        handleEditPost={handleEditPost}
        initialDataLoading={initialDataLoading}
      />
    </div>
  );
}

export default EditPost;
