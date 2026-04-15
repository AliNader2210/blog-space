import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import PostFormSkeleton from "./PostFormSkeleton";

function PostForm({
  user,
  handleAddPost,
  postToBeEdited,
  handleEditPost,
  initialDataLoading,
}) {
  const formInitialValues = postToBeEdited
    ? {
        title: postToBeEdited.title,
        description: postToBeEdited.description,
      }
    : {
        title: "",
        description: "",
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    values: { ...formInitialValues },
  });

  const [preview, setPreview] = useState();
  const [uploadTip, setUploadTip] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initializePreview = () => {
      setPreview(postToBeEdited ? postToBeEdited.image : null);
      setUploadTip(postToBeEdited ? "Leave empty to keep current image" : "");
    };
    initializePreview();
  }, [postToBeEdited]);

  const navigate = useNavigate();

  const convertToBase64 = (image) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(image);
    });
  };

  const handlePreview = (e) => {
    const image = e.target.files[0];
    if (image) {
      setPreview(URL.createObjectURL(image));
      setUploadTip("");
    } else {
      setPreview(postToBeEdited ? postToBeEdited.image : null);
      setUploadTip("Leave empty to keep current image");
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (!postToBeEdited) {
      const image = data.image[0];
      const base64 = await convertToBase64(image);
      const newPost = {
        ...data,
        image: base64,
        userId: user.id,
      };
      try {
        const res = await axios.post("http://localhost:3000/posts", newPost, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        handleAddPost({ ...res.data, user });
        toast.success("Post created successfully!");
        navigate("/", {
          replace: true,
        });
      } catch {
        toast.error("Something went wrong, please try again later");
      }
    } else {
      let image;
      if (data.image && data.image[0]) {
        image = data.image[0];
        image = await convertToBase64(image);
      } else {
        image = postToBeEdited.image;
      }
      const editedPost = {
        ...data,
        image,
        userId: user.id,
      };
      try {
        const res = await axios.put(
          `http://localhost:3000/posts/${postToBeEdited.id}`,
          editedPost,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        handleEditPost(res.data);
        toast.success("Post updated successfully!");
        navigate("/", {
          replace: true,
        });
      } catch {
        toast.error("Something went wrong, please try again later");
      }
    }
    setIsLoading(false);
  };

  if (initialDataLoading) {
    return <PostFormSkeleton />;
  }
  return (
    <div className="flex flex-col gap-3">
      <Link to="/" className="btn btn-ghost gap-2 w-fit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        Back to Home
      </Link>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-5 bg-white rounded-2xl border border-neutral-content my-2"
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7l-4-4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 3v5H7V3"
              />
              <rect
                x="9"
                y="13"
                width="6"
                height="8"
                rx="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-semibold">
              {postToBeEdited ? "Edit Post" : "Create New Post"}
            </span>
          </div>
          <p className="text-gray-500">
            {postToBeEdited
              ? "Update your blog post details below"
              : "Share your thoughts with the world"}
          </p>
        </div>
        <div className="flex flex-col gap-3 mt-5">
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="font-semibold text-sm w-full">
              Title
            </label>
            <input
              {...register("title", {
                required: "This field is required.",
              })}
              id="title"
              type="text"
              className="input w-full bg-base-300 border-0 rounded-lg outline-none ring-0 ring-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-3 focus:ring-neutral-content focus:ring-offset-1 focus:ring-offset-black/10"
              placeholder="Enter post title..."
            />
            {errors.title && (
              <p className="text-error text-xs font-bold">
                {errors.title.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="description"
              className="font-semibold text-sm w-full"
            >
              Description
            </label>
            <textarea
              {...register("description", {
                required: "This field is required.",
              })}
              id="description"
              className="textarea w-full bg-base-300 border-0 rounded-lg outline-none ring-0 ring-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-3 focus:ring-neutral-content focus:ring-offset-1 focus:ring-offset-black/10 resize-none"
              placeholder="Write your post content..."
            />
            {errors.description && (
              <p className="text-error text-xs font-bold">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="image" className="font-semibold text-sm w-full">
              Image
            </label>
            <div className="flex items-center gap-3">
              <input
                {...register("image", {
                  required: postToBeEdited ? false : "Please upload an image.",
                  validate: (files) => {
                    if (!postToBeEdited) {
                      return (
                        files[0].type.startsWith("image/") ||
                        "File must be an image"
                      );
                    }
                    return true;
                  },
                })}
                onChange={(e) => {
                  register("image").onChange(e);
                  handlePreview(e);
                }}
                id="image"
                type="file"
                accept="image/*"
                className="file-input border-0 outline-none w-full bg-base-300 rounded-lg"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="size-5 text-gray-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                />
              </svg>
            </div>
            {errors.image?.type === "required" && (
              <p className="text-error text-xs font-bold">
                {errors.image.message}
              </p>
            )}
            {errors.image?.type === "validate" && (
              <p className="text-error text-xs font-bold">
                {errors.image.message}
              </p>
            )}
          </div>
          {postToBeEdited && (
            <p className="text-sm text-gray-500">{uploadTip}</p>
          )}
          {preview && (
            <div className="max-h-50 overflow-hidden rounded-xl">
              <img src={preview} className="w-full h-50 object-cover" />
            </div>
          )}
          <div className="flex gap-4 flex-wrap">
            <button
              type="submit"
              className="btn btn-neutral grow"
              disabled={isLoading ? true : false}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : postToBeEdited ? (
                "Update Post"
              ) : (
                "Create Post"
              )}
            </button>
            <Link
              to="/"
              className="btn btn-outline border-neutral-content grow md:grow-0"
            >
              Cancel
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default PostForm;
