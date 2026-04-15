import { Link } from "react-router";

function PostCard({ post, user, handlePostToBeDeleted }) {
  const handleRemovePostClick = (id) => {
    document.getElementById("confirmationModal").showModal();
    handlePostToBeDeleted(id);
  };

  return (
    <div className="card md:card-side card-border border-neutral-content bg-white hover:shadow-lg transition-all">
      <figure className="w-full md:w-5/12 overflow-hidden shrink-0">
        <img
          src={post.image}
          alt={post.title}
          className="w-full hover:scale-105 transition-all"
        />
      </figure>
      <div className="flex flex-col rounded-br grow">
        <div className="card-body">
          <h2 className="card-title text-xl">{post.title}</h2>
          <p className="text-gray-500 grow-0">{post.description}</p>
          <div className="flex items-center gap-1.5 mt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            <span className="text-gray-500">{post.user.name}</span>
          </div>
        </div>
        {post.userId === user?.id && (
          <div className="card-actions bg-base-200 rounded-br-lg border-t border-t-neutral-content p-5">
            <Link to={`/post/edit/${post.id}`} className="btn bg-white grow">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                />
              </svg>
              Edit
            </Link>
            <button
              onClick={() => handleRemovePostClick(post.id)}
              className="btn btn-error border-0 text-white grow md:grow-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostCard;
