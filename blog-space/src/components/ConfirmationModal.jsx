import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

function ConfirmationModal({ postToBeDeleted, handleRemovePost }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleRemovePostConfirmation = async (id) => {
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      handleRemovePost(id);
      document.getElementById("confirmationModal").close();
      toast.success("Post deleted successfully");
    } catch {
      toast.error("Something went wrong, please try again later");
    }
    setIsLoading(false);
  };

  return (
    <dialog id="confirmationModal" className="modal">
      <div className="modal-box flex flex-col gap-3 w-fit">
        <div className="size-10 bg-error/25 rounded-full flex justify-center items-center m-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 text-red-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-center">Remove post</h2>
          <p className="text-center text-sm text-gray-500 max-w-2xs m-auto">
            Are you sure you want to remove this post? This action cannot be
            undone.
          </p>
        </div>
        <div className="modal-action justify-center modal-backdrop">
          <button
            onClick={() => document.getElementById("confirmationModal").close()}
            className="btn w-1/2"
          >
            Cancel
          </button>
          <button
            onClick={() => handleRemovePostConfirmation(postToBeDeleted)}
            className="btn btn-error text-white w-1/2"
            disabled={isLoading ? true : false}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Remove"
            )}
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default ConfirmationModal;
