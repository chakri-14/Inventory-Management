import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // Import Axios
import { SERVER_URL } from "../../router";

function ProductInfoScreen() {
  const params = useParams();

  const [isLoading, setLoading] = useState(true); // Adjusted loading state
  const [isError, setError] = useState(null);
  const [isSuccess, setSuccess] = useState(false);
  const [product, setProduct] = useState(null); // Initialize product as null

  useEffect(() => {
    getProductInfo();
  }, [params.id]); // Include params.id in the dependency array

  const getProductInfo = async () => {
    try {
      setLoading(true); // Set loading state to true
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
        setSuccess(true);
        setProduct(data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      setError("Error while fetching product information");
      console.error(error);
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  // JSX for rendering product information
  return (
    <div className="container mx-auto">
      {isError && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col gap-4">
            <div className="mb-3 px-3 py-1 border-2 border-yellow-600 bg-yellow-100 rounded-md text-yellow-800">
              {isError}{" "}
              <span className="underline" onClick={getProductInfo}>
                Click here to reload!
              </span>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col gap-4">
            <div className="h-12  w-12 border-b-2 border-l-2 border-r-2 border-black border-t-white animate-spin rounded-full"></div>
            <h1 className="font-semibold animate-pulse"> Loading</h1>
          </div>
        </div>
      )}
      {isSuccess && product && (
        <div className="bg-white p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-700 mb-2">{product.description}</p>
          <p className="text-gray-700 mb-2">Serial No: {product.serialNo}</p>
          <p className="text-gray-700 mb-2">
            Manufacturer: {product.manufacturer}
          </p>
          <p className="text-gray-700 mb-2">Model: {product.model}</p>
          <p className="text-gray-700 mb-2">
            Date of Purchase:{" "}
            {new Date(product.dateOfPurchase).toLocaleDateString()}
          </p>
          <p className="text-gray-700 mb-2">
            Warranty Months: {product.warrantyMonths}
          </p>
          <p className="text-gray-700 mb-2">Status: {product.status}</p>
          <p className="text-gray-700 mb-2">User: {product.user}</p>
          <p className="text-gray-700 mb-2">
            Created By: {product.createdBy.name}
          </p>
          {/* Render other product information */}
        </div>
      )}
    </div>
  );
}

export default ProductInfoScreen;
