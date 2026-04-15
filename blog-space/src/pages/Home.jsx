import { useState } from "react";
import PostCard from "../components/PostCard";
import { Link } from "react-router";
import ConfirmationModal from "../components/ConfirmationModal";
import HomeSkeleton from "../components/HomeSkeleton";

function Home({ user, handleRemovePost, posts, isLoading }) {
  const [postToBeDeleted, setPostToBeDeleted] = useState(null);

  const handlePostToBeDeleted = (id) => {
    setPostToBeDeleted(id);
  };

  if (isLoading) {
    return <HomeSkeleton />;
  }
  return (
    <div>
      {user && (
        <Link
          to="/post/new"
          className="fixed bottom-8 right-8 btn btn-circle btn-neutral size-14 hover:scale-110 transition-all z-10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.3}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </Link>
      )}
      <ConfirmationModal
        postToBeDeleted={postToBeDeleted}
        handleRemovePost={handleRemovePost}
      />
      <div className="flex flex-col gap-6 py-10">
        {posts.length > 0 &&
          posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              user={user}
              handlePostToBeDeleted={handlePostToBeDeleted}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
