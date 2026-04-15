import React, { useState } from "react";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

function Auth({ handleUserState }) {
  const [selectedAuthMode, setSelectedAuthMode] = useState("login");

  return (
    <div className="py-10 flex flex-col items-center gap-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="font-bold text-3xl text-center">Welcome to BlogSpace</h1>
        <p className="text-gray-500 text-center">
          Join our community of writers and readers
        </p>
      </div>
      <div className="max-w-[466.99px]">
        <div className="flex justify-center bg-base-300 rounded-2xl p-1 gap-1 font-semibold text-sm w-fit m-auto">
          <button
            onClick={() => setSelectedAuthMode("login")}
            className={`${selectedAuthMode === "login" ? "bg-white" : "bg-inherit hover:bg-neutral-content"} px-5 md:px-23 py-1 rounded-2xl cursor-pointer transition-all`}
          >
            Login
          </button>
          <button
            onClick={() => setSelectedAuthMode("register")}
            className={`${selectedAuthMode === "register" ? "bg-white" : "bg-inherit hover:bg-neutral-content"} px-5 md:px-23 py-1 rounded-2xl cursor-pointer transition-all`}
          >
            Register
          </button>
        </div>
        {selectedAuthMode === "login" ? (
          <LoginForm handleUserState={handleUserState} />
        ) : (
          <RegisterForm handleUserState={handleUserState} />
        )}
      </div>
    </div>
  );
}

export default Auth;
