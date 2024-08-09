import axios from "axios";
import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { SERVER_URL } from "../router";

function InventoryForm() {
  const [isLoading, seELoading] = useState(false);
  const [isError, setError] = useState(null);
  const [isSuccess, setSuccess] = useState(false);

  const [data] = useOutletContext();
  const [formData, setFormData] = useState({
    createdBy: data.user._id,
    title: "",
    description: "",
    serialNo: "",
    manufacturer: "",
    model: "",
    dateOfPurchase: "",
    warrantyMonths: "",
    status: "none",
    user: "none",
    rackMountable: false,
    isPart: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add form submission logic here
    console.log(formData);

    try {
      if (isError) setError(false);
      if (isSuccess) setSuccess(false);

      const { data, status } = await axios.post(
        `${SERVER_URL}/api/v1/products/`,
        formData,
        {
          withCredentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (status === 201) {
        setSuccess(true);
        setFormData({
          ...formData,
          title: "",
          description: "",
          serialNo: "",
          manufacturer: "",
          model: "",
          dateOfPurchase: "",
          warrantyMonths: "",
          status: "none",
          user: "none",
          rackMountable: false,
          isPart: false,
        });
      }
      if (status === 400) {
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
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto my-8">
      {isError && (
        <div className="mb-3 px-3 py-1 border-2 border-yellow-600 bg-yellow-100 rounded-md text-yellow-800">
          {isError}
        </div>
      )}
      {isSuccess && (
        <div className="mb-3 px-3 py-1 border-2 border-green-600 bg-green-100 rounded-md text-green-900">
          {"New Product added to inventory successfully"}
        </div>
      )}
      <div className="mb-4">
        <label htmlFor="title" className="block mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="serialNo" className="block mb-2">
          Serial Number
        </label>
        <input
          type="text"
          id="serialNo"
          name="serialNo"
          value={formData.serialNo}
          onChange={handleChange}
          required
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="manufacturer" className="block mb-2">
          Manufacturer
        </label>
        <input
          type="text"
          id="manufacturer"
          name="manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
          required
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="model" className="block mb-2">
          Model
        </label>
        <input
          type="text"
          id="model"
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="dateOfPurchase" className="block mb-2">
          Date of Purchase
        </label>
        <input
          type="date"
          id="dateOfPurchase"
          name="dateOfPurchase"
          value={formData.dateOfPurchase}
          onChange={handleChange}
          required
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="warrantyMonths" className="block mb-2">
          Warranty Months
        </label>
        <input
          type="number"
          id="warrantyMonths"
          name="warrantyMonths"
          value={formData.warrantyMonths}
          onChange={handleChange}
          required
          className="border rounded px-4 py-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="status" className="block mb-2">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
          className="border rounded px-4 py-2 w-full"
        >
          <option value="none">None</option>
          <option value="repair">Repair</option>
          <option value="in use">In Use</option>
          <option value="not in use">Not in Use</option>
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="user" className="block mb-2">
          User
        </label>
        <select
          id="user"
          name="user"
          value={formData.user}
          onChange={handleChange}
          required
          className="border rounded px-4 py-2 w-full"
        >
          <option value="none">None</option>
          <option value="Normal User">Normal User</option>
          <option value="department">Department</option>
          <option value="admin">Admin</option>
          <option value="administrator">Administrator</option>
        </select>
      </div>
      <div className="mb-4 flex gap-4 items-center">
        <label htmlFor="rackMountable" className="block mb-2">
          Rack Mountable
        </label>
        <input
          type="checkbox"
          id="rackMountable"
          name="rackMountable"
          checked={formData.rackMountable}
          onChange={handleChange}
          className="mr-2"
        />
      </div>
      <div className="mb-4 flex gap-4 items-center">
        <label htmlFor="isPart" className="block mb-2">
          Is Part
        </label>
        <input
          type="checkbox"
          id="isPart"
          name="isPart"
          checked={formData.isPart}
          onChange={handleChange}
          className="mr-2"
        />
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className="bg-slate-500 text-white px-4 py-2 rounded hover:bg-slate-600"
      >
        {isLoading ? "Uploading please wait " : " Submit"}
      </button>
    </form>
  );
}

export default InventoryForm;
