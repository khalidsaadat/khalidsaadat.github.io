import React, { useState } from "react";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [password, setPass] = useState({});
  const [email, setEmail] = useState({});
  const [name, setName] = useState({});
  const [isRecruiter, setRecruiter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const register = async () => {
    await axios
      .post("/api/account/register", { email, password, name, isRecruiter })
      .then((res) => {
        console.log("logged in", res);
        navigate("/login");
      })
      .catch((err) => {
        console.log("Error", err);
        setErrorMessage(
          "Please check your email is correct and that your password contains atleast 8 characters, a number and a capital letter ."
        );
      });
  };

  React.useEffect(() => {
    if (localStorage.getItem("loggedIn") === 1) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <meta charSet="utf-8" />
        <title>User Registration</title>
      </Helmet>
      <div className="w-full max-w-md space-y-8">
        <div>
          <img
            className="mx-auto h-48 w-auto"
            src="/src/static/images/loginimg.png"
            alt="Your Company"
          />
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>
        {errorMessage && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}
        <form
          className="mt-8 space-y-6"
          action="#"
          method="POST"
          onSubmit={(e) => {
            e.preventDefault();
            register();
          }}
        >
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="User Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Password"
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="isRecruiter"
                name="isRecruiter"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                onChange={() => {
                  setRecruiter(!isRecruiter);
                }}
              />
              <label
                htmlFor="isRecruiter"
                className="ml-2 block text-sm text-gray-900"
              >
                Recruiter
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Register
            </button>
          </div>
          <hr />

          <div>
            <Link to="/login">
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-200 py-2 px-4 text-sm font-medium text-slate-900 hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Have an account? Login
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
