import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ShowErrorMessage from "../../components/ShowErrorMessage";
import ShowSuccessMesasge from "../../components/ShowSuccessMesasge";
import LoadingIndicator from "../../components/LoadingIndicator";
import axios from "axios";
import { SERVER_URL } from "../../router";

function EditLocationScreen() {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [data, setData] = useState({
    _id: "663c84f0479858cdb4a0ca9c",
    name: "sector 1",
    description: "about sector 1 some random content",
    createdAt: "2024-05-09T08:10:24.852Z",
    updatedAt: "2024-05-09T08:10:24.852Z",
    __v: 0,
  });
  const [isError, setError] = useState("");

  useEffect(() => {
    getDataFromApi();
  }, []);
  async function getDataFromApi() {
    try {
      setError("");

      const { data } = await axios.get(
        `${SERVER_URL}/api/v1/location/${params.id}`
      );
      setData(data);
    } catch (e) {
      setError(e);
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  function onchangeHandler(e) {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setData({ ...data, [name]: value });
  }
  async function handleUpdate(e) {
    e.preventDefault();
    try {
      setError("");
      setUploading(true);

      const {} = await axios.patch(
        `${SERVER_URL}/api/v1/location/${params.id}`,
        data,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setSuccess(true);
    } catch (e) {
      setError(e);
      console.log(e);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="p-5 w-full h-full">
      {isLoading && <LoadingIndicator />}

      {isError && (
        <ShowErrorMessage
          children={
            <span className="underline cursor-pointer" onClick={getDataFromApi}>
              reload
            </span>
          }
        />
      )}
      {success && (
        <ShowSuccessMesasge
          children={
            <p>
              Updated Successfullly{" "}
              <Link className="underline" to={"/"} replace={true}>
                goto Home
              </Link>
            </p>
          }
        />
      )}

      {data && !isError && (
        <div className="max-w-lg mx-auto">
          <form
            onChange={(e) => onchangeHandler(e)}
            onSubmit={handleUpdate}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={data.name}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="desc"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Description
              </label>
              <input
                type="text"
                name="description"
                id="desc"
                value={data.description}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                disabled={uploading}
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {uploading
                  ? "Uploading"
                  : success
                  ? "Updated successfully"
                  : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default EditLocationScreen;
