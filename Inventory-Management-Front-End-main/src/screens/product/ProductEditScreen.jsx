import React, { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios
import ShowSuccessMesasge from "../../components/ShowSuccessMesasge";
import { SERVER_URL } from "../../router";

function ProductEditScreen() {
  const params = useParams();
  const [isLoading, seELoading] = useState(false);
  const [isError, setError] = useState(null);
  const [isSuccess, setSuccess] = useState(false);

  const [allLocations, setAllLocations] = useState([]);
  const [manufacturer, setManufacturer] = useState([]);

  const [data] = useOutletContext();
  const [formData, setFormData] = useState({
    createdBy: data.user._id,
    locationId: "",
    status: "not in use",
    title: "",
    description: "",
    serialNo: "",
    rackMountable: false,
    isPart: false,
    manufacturer: "",
    model: "",
    warrantyMonths: "",
    user: "department",
    dateOfPurchase: "",
  });

  useEffect(() => {
    getProductInfo();
  }, [params.id]);
  const getProductInfo = async () => {
    try {
      seELoading(true);
      const manufacturersRes = await axios.get(
        `${SERVER_URL}/api/v1/brands`
      );
      const locationsRes = await axios.get(
        `${SERVER_URL}/api/v1/location`
      );
      setAllLocations(locationsRes.data);
      setManufacturer(manufacturersRes.data);
      if (locationsRes.data.length > 0 && manufacturersRes.data.length > 0) {
        setFormData({
          ...formData,
          manufacturer: manufacturersRes.data[0]._id,
          locationId: locationsRes.data[0]._id,
        });
      }

      const { data, status } = await axios.get(
        `${SERVER_URL}/api/v1/products/${params.id}`,
        {
          withCredentials: true, // Change "include" to true
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      if (status === 200) {
        const id = formData.createdBy;

        setFormData({
          ...data,
          createdBy: id,
        });
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setError("Error while fetching product information");
      console.error(error);
    } finally {
      seELoading(false); // Set loading state to false
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);

    try {
      if (isError) setError(false);
      if (isSuccess) setSuccess(false);

      const { data, status } = await axios.put(
        `${SERVER_URL}/api/v1/products/${formData._id}`,
        formData,
        {
          withCredentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (status === 200) {
        setSuccess(true);
        alert("Product updated");
      }
      if (status === 404 || status === 400) {
        throw new Error(data.error);
      }
    } catch (e) {
      setError("Error while addin new item");
      console.log(e);
    } finally {
      seELoading(false);
    }
  };

  return (
    <div className="m-5">
      <h1 className="text-3xl font-semibold text-neutral-900">
        Edit Product
      </h1>
      {isError && <div className="text-red-500">{isError}</div>}
      {isSuccess && <div className="text-green-500">{"Updated successfully"}</div>}
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          <div>
            <label
              htmlFor="title"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="serialNo"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Serial Number
            </label>
            <input
              type="text"
              id="serialNo"
              name="serialNo"
              value={formData.serialNo}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="rackMountable"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Rack Mountable
            </label>
            <select
              id="rackMountable"
              name="rackMountable"
              value={formData.rackMountable}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="isPart"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Is Part
            </label>
            <select
              id="isPart"
              name="isPart"
              value={formData.isPart}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            >
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="manufacturer"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Manufacturer
            </label>
            <select
              type="text"
              id="manufacturer"
              name="manufacturer"
              value={formData.manufacturer}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            >
              {manufacturer.map((man) => (
                <option value={man._id}>{man.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="location"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Location / Sector
            </label>
            <select
              type="text"
              id="locationId"
              name="locationId"
              value={formData.locationId}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            >
              {allLocations.map((loc) => (
                <option value={loc._id}>{loc.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="model"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Model
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="warrantyMonths"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Warranty Months
            </label>
            <input
              type="number"
              id="warrantyMonths"
              name="warrantyMonths"
              value={formData.warrantyMonths}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
          <div>
            <label
              htmlFor="user"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              User
            </label>
            <select
              id="user"
              name="user"
              value={formData.user}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            >
              <option value="department">Department</option>
              <option value="admin">Admin</option>
              <option value="normal user">Normal User</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="user"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            >
              <option value="repair">Repair</option>
              <option value="not in use">Not In Use </option>
              <option value="in use">In Use</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="dateOfPurchase"
              className="block text-lg font-semibold text-neutral-800 mb-1"
            >
              Date of Purchase
            </label>
            <input
              type="datetime-local"
              id="dateOfPurchase"
              name="dateOfPurchase"
              value={formData.dateOfPurchase.split('Z')[0]}
              onChange={handleChange}
              className="border border-neutral-500 rounded-md px-3 py-2 w-full outline-none"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-teal-500 text-white font-semibold rounded-md hover:bg-teal-600 transition duration-300"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Update Product"}
        </button>
      </form>
      <br />
      {isSuccess && (
        <ShowSuccessMesasge
          children={
            <div className="text-gray-900 text-lg">
              {"Updated Successfully"}
            </div>
          }
        />
      )}
    </div>
  );
}

{
  /* <button
disabled={isLoading}
type="submit"
className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-600"
>
{isLoading
  ? "Upadating in progress please wait "
  : " Update Product info"}
</button> */
}

export default ProductEditScreen;
