import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../../router";

function LoginScreen() {
  
  const [formData, setData] = useState({
    email: "",
    password: "",
  });

  const history = useNavigate(); // Use useNavigate instead of useHistory

  function handInputChange(e) {
    setData({ ...formData, [e.target.id]: e.target.value });
  }

  async function handleSignIn(e) {
    e.preventDefault();

    try {
      const { data, status } = await axios.post(
        `${SERVER_URL}/api/v1/users/login`,
        formData,
        {
          withCredentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (status === 201) {
        // console.log(response.headers.Set-Cookie)
        // alert("Login success");
        // Redirect to home upon successful login
        history("/"); // Use history function to redirect
      } else {
        alert("Wrong credentials. Check Email and password ");
      }
    } catch (error) {
      console.error("Something went wrong:", error); // Corrected console.log to console.error
      alert("Something went wrong");
    }
  }

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
        <div className="p-4 py-6 text-white bg-blue-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
          <div className="my-3 text-4xl font-bold tracking-wider text-center">
            <a href="#">Inventory Management</a>
          </div>
          <p className="mt-6 font-normal text-center text-gray-300 md:mt-0">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            eligendi perspiciatis, sapiente si.
          </p>
          <p className="flex flex-col items-center justify-center mt-10 text-center">
            <span>Don't have an account?</span>
            <Link to={"signup"} className="underline">
              Get Started!
            </Link>
          </p>
          <p className="mt-6 text-sm text-center text-gray-300">
            Read our{" "}
            <a href="#" className="underline">
              terms
            </a>{" "}
            and{" "}
            <a href="#" className="underline">
              conditions
            </a>
          </p>
        </div>
        <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">
            Account Login
          </h3>
          <form
            action="#"
            className="flex flex-col space-y-5"
            onSubmit={(e) => handleSignIn(e)}
          >
            <div className="flex flex-col space-y-1">
              <label
                htmlFor="email" // Corrected 'for' to 'htmlFor'
                className="text-sm font-semibold text-gray-500"
              >
                Email address
              </label>
              <input
                onChange={handInputChange}
                type="email"
                id="email"
                autoFocus // Corrected 'autofocus' to 'autoFocus'
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password" // Corrected 'for' to 'htmlFor'
                  className="text-sm font-semibold text-gray-500"
                >
                  Password
                </label>
              </div>
              <input
                type="password"
                onChange={handInputChange}
                id="password"
                required
                className="px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />
              <label
                htmlFor="remember" // Corrected 'for' to 'htmlFor'
                className="text-sm font-semibold text-gray-500"
              >
                Remember me
              </label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
