import React, { useState } from "react";
import { IoIosLogOut } from "react-icons/io";
import LoadingIndicator from "./LoadingIndicator";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../router";

function LogoutButton() {
  const [isLoading, setLoading] = useState(false);
  const navigator = useNavigate();

  const handleLogout = async () => {
    try {
      setLoading(true);
      const { data, status } = await axios.get(
        `${SERVER_URL}/api/v1/users/logout`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (status === 200) {
        navigator("/", { replace: true });
        window.location.reload();
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      onClick={handleLogout}
      // to={"/admin/settings"}
      className={`${
        isLoading && "animate-pulse"
      } flex items-center justify-between px-4 border-t border-b hover:bg-red-700 bg-red-400 font-semibold   text-white py-2 `}
    >
      Log out{" "}
      {isLoading ? (
        <span className="w-5 h-5 ">
          <LoadingIndicator />
        </span>
      ) : (
        <IoIosLogOut />
      )}
    </button>
  );
}

export default LogoutButton;
