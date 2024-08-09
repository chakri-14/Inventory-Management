import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import ShowErrorMessage from "../../components/ShowErrorMessage";
import { IoMailOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { SERVER_URL } from "../../router";

function LocationsScreen() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [isError, setError] = useState("");

  useEffect(() => {
    getDataFromApi();
  }, []);
  async function getDataFromApi() {
    try {
      const { data } = await axios.get(`${SERVER_URL}/api/v1/location`);
      setData(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="p-5 w-full h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">All Locations</h1>
        <Link
          to={"new"}
          className="px-4 py-1 hover:bg-teal-600 hover:text-slate-50 font-semibold text-teal-600 bg-teal-50 border-2 border-teal-600 rounded-md"
        >
          Add New Location
        </Link>
      </div>
      <br />

      {isLoading && <LoadingIndicator />}

      {isError && (
        <ShowErrorMessage
          children={<span className="underline cursor-pointer">reload</span>}
        />
      )}

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.map((location) => (
            <div className=" col-span-1">
              <LoactionCard data={location} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LoactionCard({ data }) {
  return (
    <div className="bg-white border rounded-md shadow-teal-100  hover:shadow-md hover:shadow-teal-200 transition-transform shadow-sm p-6 relative">
      <h2 className="text-xl font-semibold">{data.name}</h2>
      <p className="mt-2 text-gray-600 line-clamp-2">{data.description}</p>
  
      {data.editedBy ? (
        <>
          <hr className="my-4 border-gray-300" />
          <div className="flex items-center">
            <div>
              <div className="flex justify-between items-center w-full gap-2">
                <p className="text-gray-600 flex gap-2 items-center line-clamp-1">
                  <FaUser />
                  <h3 className="font-semibold line-clamp-1">{data.editedBy.name}</h3>
                </p>
                <span className="px-3 py-1 line-clamp-1 bg-neutral-200 text-sm rounded-3xl text-teal-800">
                  Edited By
                </span>
              </div>
              <p className="text-gray-600 flex gap-2 items-center">
                <IoMailOutline />
                {data.editedBy.email}
              </p>
            </div>
          </div>
        </>
      ) : (
        data.createdBy && (
          <>
            <hr className="my-4 border-gray-300" />
            <div className="flex items-center">
              <div>
                <div className="flex justify-between items-center w-full gap-2">
                  <p className="text-gray-600 flex gap-2 items-center line-clamp-1">
                    <FaUser />
                    <h3 className="font-semibold line-clamp-1">
                      {data.createdBy.name}
                    </h3>
                  </p>
                  <span className="line-clamp-1 px-3 py-1 bg-neutral-200 text-sm rounded-3xl text-teal-800">
                    Created By
                  </span>
                </div>
                <p className="text-gray-600 flex gap-2 items-center">
                  <IoMailOutline />
                  {data.createdBy.email}
                </p>
              </div>
            </div>
          </>
        )
      )}

      <NavLink
        to={`edit/${data._id}`}
        className="absolute top-2 right-2 z-10 bg-teal-100 px-3 py-1 rounded-sm font-semibold text-sm hover:bg-teal-900 hover:text-slate-200"
      >
        Edit
      </NavLink>
    </div>
  );
}

export default LocationsScreen;
