import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LoadingIndicator from "../../components/LoadingIndicator";
import ShowErrorMessage from "../../components/ShowErrorMessage";
import { NavLink, useOutletContext } from "react-router-dom";
import ManageUserTableRow from "./components/ManageUserTableRow";
import { SERVER_URL } from "../../router";

function UserManagementScreen() {
  const [data, user] = useOutletContext();
  console.log(user);
  const [isLoading, setLoading] = useState(true);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const [roleFilter, setRoleFilter] = useState("");

  useEffect(() => {
    getDataFromApi();
  }, [currentPage, itemsPerPage, searchTerm, roleFilter]);

  async function getDataFromApi() {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/api/v1/users/all`,
        {
          params: {
            page: currentPage,
            itemsPerPage,
            search: searchTerm,
            role: roleFilter,
          },
        }
      );
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  }

  function handlePrevPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="m-5">
      <div>
        <h1 className="text-3xl font-semibold text-neutral-900">
          User Management
        </h1>
        <p className="text-lg text-neutral-600">
          Here you can modify the privilege of a user [admin/user]
        </p>
      </div>
      <br />

      {error && (
        <ShowErrorMessage
          children={<span className="underline cursor-pointer">reload</span>}
          message={error}
        />
      )}
      <br />
      <div className="flex gap-3 items-center justify-between">
        <div className="flex gap-4 ">
          <input
            type="text"
            className="outline-none px-3 py-1 border-neutral-500 border-2 rounded-md text-lg"
            placeholder="Search users"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="outline-none px-3 py-1 border-neutral-500 border-2 rounded-md text-lg"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="">None</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
      <br />
      <div className="border rounded-md border-neutral-700">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse">
            <thead className="border-b text-left">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                {user && user.role === "admin" && (
                  <th className="px-4 py-2">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-4 py-2 text-center">
                    <LoadingIndicator />
                  </td>
                </tr>
              ) : (
                users.map((_user) => (
                  <ManageUserTableRow role={user.role} user={_user} />
                ))
              )}
            </tbody>
          </table>
          <div className="flex items-center justify-between py-2 mx-5">
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                className="border rounded-md aspect-square w-10 text-center"
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(e.target.value)}
              />
              <h5>Per Page</h5>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="flex gap-2 items-center border rounded-md py-1 text-lg font-semibold px-3 hover:bg-teal-50 hover:text-teal-700 text-center"
              >
                <IoIosArrowBack />
                <span>Prev</span>
              </button>
              <input
                type="number"
                min={1}
                className="border rounded-md aspect-square w-10 text-center"
                value={currentPage}
                onChange={(e) => setCurrentPage(e.target.value)}
              />
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex gap-2 items-center border rounded-md py-1 text-lg font-semibold px-3 hover:bg-teal-50 hover:text-teal-700 text-center"
              >
                <span>Next</span>
                <IoIosArrowForward />
              </button>
              <h6>Total {totalPages} pages</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserManagementScreen;
