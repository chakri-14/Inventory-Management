import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SERVER_URL } from "../../../router";

function ManageUserTableRow({ user, role }) {
  const [userRole, setUserRole] = useState(user.role);
  const [isLoading, setLoading] = useState(false);
  async function changeRoleAPicall() {
    try {
      setLoading(true);
      await axios.patch(
        `${SERVER_URL}/api/v1/users/chage-role`,
        {
          targetUserId: user._id,
          role: userRole==="user" ? "admin":"user",
        },
        {
          withCredentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(userRole)
      setUserRole((s) => (s === "admin" ? "user" : "admin"));
    } catch (e) {
      console.log(e);
      setUserRole((s) => (s === "admin" ? "user" : "admin"));
    } finally {
      setLoading(false);
    }
  }
  async function changeRole() {
   // setUserRole((s) => (s === "admin" ? "user" : "admin"));
    await changeRoleAPicall();
  }
  return (
    <tr key={user._id} className="border-b border ">
      <td className="px-4 py-3 ">{user.name}</td>
      <td className="px-4 py-3">{user.email}</td>
      <td className={`px-4 py-3`}>
        <span
          className={`${
            userRole === "admin"
              ? "bg-red-200 rounded-md border-red-600 border"
              : "bg-teal-100 rounded-md border-teal-900 border"
          } px-3 py-1 w-min ${isLoading && "animate-pulse"} `}
        >
          {userRole}
        </span>
      </td>

      {user && role === "admin" && (
        <td className="px-4 py-3">
          <button
            onClick={changeRole}
            className="underline text-blue-500 flex items-center gap-3"
          >
            Change Role to{" "}
            <span>{userRole === "admin" ? "user" : "admin"}</span>
            {isLoading && (
              <div className="w-5 h-5 border-2 border-b-black border-t-black border-r-black rounded-full animate-spin" />
            )}
          </button>
        </td>
      )}
    </tr>
  );
}

export default ManageUserTableRow;
