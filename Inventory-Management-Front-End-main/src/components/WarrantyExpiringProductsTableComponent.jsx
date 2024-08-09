import React, { useEffect, useState } from "react";
import EmptyData from "../assets/undraw_empty_re.svg";
import axios from "axios";
import { Link } from "react-router-dom";
import { SERVER_URL } from "../router";

function WarrantyExpiringProductsTablesComponent({ uid }) {
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(null);
  const [inventoryData, setInventoryData] = useState([]);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const { data } = await axios.get(`${SERVER_URL}/api/v1/analytics/expiring`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setInventoryData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching inventory data:", error);
      setError("Error fetching inventory data");
      setLoading(false);
    }
  };

  const calculateMonthsDifference = (date1, date2) => {
    const diffInMs = new Date(date2) - new Date(date1);
    return Math.round(diffInMs / (1000 * 60 * 60 * 24 * 30.44)); // Approximate number of days in a month
  };

  return (
    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Error: {isError}</div>
      ) : inventoryData.length === 0 ? (
        <div className="flex items-center justify-center">
          <img src={EmptyData} alt="Empty Data" />
          <h3>No data available</h3>
        </div>
      ) : (
        <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-white bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-5 py-3 border-b-2 border-white bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Serial Number
                </th>
                <th className="px-5 py-3 border-b-2 border-white bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Warranty Months / Purchase Date
                </th>
                <th className="px-5 py-3 border-b-2 border-white bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-5 py-3 border-b-2 border-white bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item, index) => (
                <tr key={index}>
                  <td className="px-5 py-5 border-b border-white text-sm">
                    {item.title}
                  </td>
                  <td className="px-5 py-5 border-b border-white text-sm">
                    {item.serialNo}
                  </td>
                  <td className="px-5 py-5 border-b border-white text-sm">
                    {item.warrantyMonths} / {item.dateOfPurchase.split("T")[0]}
                  </td>
                  <td className="px-5 py-5 border-b border-white text-sm">
                    {item.history[0].status[0].name}
                  </td>
                  <td className="px-5 py-5 border-b border-white text-sm">
                    <Link to={`/products/history/${item._id}`} className="text-blue-500 hover:underline mr-2">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default WarrantyExpiringProductsTablesComponent;
