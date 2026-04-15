import React from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

function Navbar({ user, handleUserState }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    handleUserState(null);
    navigate("/", {
      replace: true,
    });
    toast.success("Logout successful!");
  };

  return (
    <nav className="navbar px-5 md:px-24 border-b border-b-neutral-content fixed z-10 bg-white/95 backdrop-blur-xs flex-wrap gap-2 md:gap-0">
      <div className="navbar-start w-full md:w-1/2 justify-center md:justify-start">
        <Link to="/" className="gap-2 flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="size-7 text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
            />
          </svg>
          <h1 className="text-xl font-semibold">BlogSpace</h1>
        </Link>
      </div>
      <div className="navbar-end w-full md:w-1/2 justify-center md:justify-end">
        {user ? (
          <div className="flex items-center gap-4">
            <p className="text-sm">
              Hi, <span className="font-semibold">{user.name}</span>
            </p>
            <button
              onClick={handleLogout}
              className="btn btn-outline border-neutral-content"
            >
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
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                />
              </svg>
              Logout
            </button>
          </div>
        ) : (
          <Link to="/auth" className="btn btn-neutral">
            Login / Register
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
