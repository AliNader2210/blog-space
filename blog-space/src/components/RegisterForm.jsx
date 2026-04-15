import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function RegisterForm({ handleUserState }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    values: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const password = watch("password");

  const onSubmit = async (data) => {
    setIsLoading(true);
    const newUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    try {
      const res = await axios.post("http://localhost:3000/register", newUser);
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      handleUserState(res.data.user);
      toast.success("Registration successful!");
      navigate("/", {
        replace: true,
      });
    } catch (error) {
      if (error.response.status === 400) {
        toast.error(error.response.data);
      } else {
        toast.error("Something went wrong, please try again later");
      }
    }
    setIsLoading(false);
  };

  return (
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
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </svg>
          <span className="font-semibold">Register</span>
        </div>
        <p className="text-gray-500">Create a new account to start blogging</p>
      </div>
      <div className="flex flex-col gap-3 mt-5">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-semibold text-sm w-full">
            Name
          </label>
          <input
            {...register("name", { required: true })}
            id="name"
            type="text"
            className="input w-full bg-base-300 border-0 rounded-lg outline-none ring-0 ring-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-3 focus:ring-neutral-content focus:ring-offset-1 focus:ring-offset-black/10"
            placeholder="John Doe"
          />
          {errors.name?.type === "required" && (
            <p className="text-error text-xs font-bold">
              This field is required.
            </p>
          )}
        </div>
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
          {errors.email?.type === "required" && (
            <p className="text-error text-xs font-bold">
              This field is required.
            </p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="text-error text-xs font-bold">
              Please enter a valid Email.
            </p>
          )}
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
          {errors.password?.type === "required" && (
            <p className="text-error text-xs font-bold">
              This field is required.
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-error text-xs font-bold">
              Password should be at least 8 characters.
            </p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="text-error text-xs font-bold">
              Invalid password. Your password must include at least one
              lowercase letter, one uppercase letter, one number, and one
              special character (e.g., !, @, #).
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="confirmPassword" className="font-semibold text-sm">
            Confirm Password
          </label>
          <input
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === password || "Passwords do not match.",
            })}
            id="confirmPassword"
            type="password"
            className="input w-full bg-base-300 border-0 rounded-lg outline-none ring-0 ring-transparent transition-all duration-300 ease-in-out focus:outline-none focus:ring-3 focus:ring-neutral-content focus:ring-offset-1 focus:ring-offset-black/10"
            placeholder="••••••••"
          />
          {errors.confirmPassword?.type === "required" && (
            <p className="text-error text-xs font-bold">
              This field is required.
            </p>
          )}
          {errors.confirmPassword?.type === "validate" && (
            <p className="text-error text-xs font-bold">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>
      <button
        className="btn btn-neutral w-full rounded-lg mt-4"
        disabled={isLoading ? true : false}
      >
        {isLoading ? (
          <span className="loading loading-spinner"></span>
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}

export default RegisterForm;
