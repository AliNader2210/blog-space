import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import axios from "axios";

function App() {
  const { pathname } = useLocation();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/posts?_expand=user");
        setPosts(res.data);
      } catch {
        toast.error("Something went wrong, please try again later", {
          toastId: "fetch-posts-error",
        });
      }
      setIsLoading(false);
    };
    getPosts();
  }, []);

  const handleRemovePost = (id) => {
    let newPosts = [...posts];
    newPosts = newPosts.filter((post) => post.id !== id);
    setPosts(newPosts);
  };

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleEditPost = (editedPost) => {
    const updatedPosts = [...posts];
    const editedPostIdx = updatedPosts.findIndex(
      (post) => post.id === editedPost.id,
    );
    updatedPosts[editedPostIdx] = { ...editedPost, user };
    setPosts(updatedPosts);
  };

  const handleUserState = (user) => {
    setUser(user);
  };

  return (
    <div>
      <Navbar user={user} handleUserState={handleUserState} />
      <div
        className={`${pathname === "/auth" ? "bg-primary-content/50" : "bg-base-200"} min-h-screen pt-16`}
      >
        <div className="w-11/12 md:w-2/3 m-auto">
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  user={user}
                  handleRemovePost={handleRemovePost}
                  posts={posts}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/auth"
              element={<Auth handleUserState={handleUserState} />}
            />
            <Route
              path="/post/new"
              element={<AddPost user={user} handleAddPost={handleAddPost} />}
            />
            <Route
              path="post/edit/:id"
              element={
                <EditPost
                  user={user}
                  posts={posts}
                  handleEditPost={handleEditPost}
                  initialDataLoading={isLoading}
                />
              }
            />
          </Routes>
        </div>
      </div>
      <ToastContainer position="top-center" />
    </div>
  );
}

export default App;
