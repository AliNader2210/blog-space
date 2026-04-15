import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function LoginForm({ handleUserState }) {
  const { register, handleSubmit } = useForm({
    values: {
      email: "",
      password: "",
    },
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/login", data);
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      handleUserState(res.data.user);
      toast.success("Login successful!");
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("Invalid email or password");
      } else {
        toast.error("Something went wrong, please try again later");
      }
    }
    setIsLoading(false);
  };

  const onError = () => {
    toast.error("Invalid email or password");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
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
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
            />
          </svg>
          <span className="font-semibold">Login</span>
        </div>
        <p className="text-gray-500">
          Enter your credentials to access your account
        </p>
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-semibold text-sm w-full">
            Email
          </label>
          <input
            {...register("email", {
              required: true,
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            })}
            id="email"
            type="email"
            className="input w-full bg-base-300 border-0 rounded-lg outline-none ring-0 ring-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-3 focus:ring-neutral-content focus:ring-offset-1 focus:ring-offset-black/10"
            placeholder="john@example.com"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-semibold text-sm">
            Password
          </label>
          <input
            {...register("password", {
              required: true,
              minLength: 8,
              pattern:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            })}
            id="password"
            type="password"
            className="input w-full bg-base-300 border-0 rounded-lg outline-none ring-0 ring-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-3 focus:ring-neutral-content focus:ring-offset-1 focus:ring-offset-black/10"
            placeholder="••••••••"
          />
        </div>
      </div>
      <button
        className="btn btn-neutral w-full rounded-lg mt-4"
        disabled={isLoading ? true : false}
      >
        {isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}

export default LoginForm;
