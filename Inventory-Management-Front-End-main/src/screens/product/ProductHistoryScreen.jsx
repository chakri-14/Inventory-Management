import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingIndicator from "../../components/LoadingIndicator";
import ShowErrorMessage from "../../components/ShowErrorMessage";
import { IoMailOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import { useParams } from "react-router-dom";

import { useCallback } from "react";
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
} from "reactflow";
import dagre from "dagre";
import { ProductRow } from "./ProductsScreen";
import { SERVER_URL } from "../../router";

function ProductHistoryScreen() {
  const params = useParams();
  const [isLoading, setLoading] = useState(true);
  const [productData, setData] = useState(null);
  const [isError, setError] = useState("");

  useEffect(() => {
    getDataFromApi();
  }, []);
  async function getDataFromApi() {
    try {
      const { data } = await axios.get(
        `${SERVER_URL}/api/v1/products/${params.id}/history`
      );
      // console.log(data);
      setData(data);
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }
  console.log(productData?.history);
  return (
    <div>
      <div className="p-5 w-full h-full">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Product Information</h1>
        </div>
        <br />

        {isLoading && (
          <div className="h-screen">
            <LoadingIndicator />
          </div>
        )}

        {isError && (
          <div className="h-screen">
            <ShowErrorMessage
              children={
                <span
                  className="underline cursor-pointer"
                  onClick={getDataFromApi}
                >
                  reload
                </span>
              }
            />
          </div>
        )}

        <div className="border rounded-md border-neutral-700">
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead className="border-b text-left">
                <tr>
                  <th className="px-4 py-2">DETAILS</th>
                  <th className="px-4 py-2">SERIAL NUMBER</th>
                  <th className="px-4 py-2">USED BY</th>
                  <th className="px-4 py-2">isPart</th>
                  <th className="px-4 py-2">RACKMOUNTABLE</th>
                  <th className="px-4 py-2">DATE OF PURCHASE</th>
                  <th className="px-4 py-2">MODEL</th>
                  <th className="px-4 py-2">WARRANTY</th>
                  <th className="px-4 py-2">MANUFACTURER</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="5" className="px-4 py-2 text-center">
                      <LoadingIndicator />
                    </td>
                  </tr>
                ) : (
                  <tr className="border-b hover:bg-teal-50 hover:text-teal-700">
                    <td className="px-4 py-2 flex gap-3 items-center">
                      <div className="px-4 py-2 flex flex-col">
                        <h5 className="text-lg font-semibold text-zinc-800">
                          {productData.title}
                        </h5>
                        <p className="text-neutral-600  line-clamp-1  text-sm">
                          {productData.description}
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
                      {productData.serialNo}
                    </td>
                    <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
                      {productData.user}
                    </td>
                    <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
                      {productData.isPart ? "TRUE" : "FALSE"}
                    </td>
                    <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
                      {productData.rackMountable ? "TRUE" : "FALSE"}
                    </td>
                    <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
                      {productData.dateOfPurchase.split("T")[0]}
                    </td>
                    <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
                      {productData.model}
                    </td>
                    <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
                      {productData.warrantyMonths}
                    </td>
                    <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
                      {productData.manufacturer.name}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <br />
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">Product History</h1>
        </div>
        <br />

        {productData && (
          <HistoryTable historyInformation={productData?.history} />
        )}
      </div>
    </div>
  );
}
const HistoryTable = ({ historyInformation }) => {
  return (
    <div className="border rounded-md border-neutral-700">
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse">
          <thead className="border-b text-left">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {historyInformation.map((history) => (
              <tr key={history._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {history.location.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {history.location.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {history.status.map((status, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-2">{status.name}</span>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {history.status.map((status, index) => (
                    <div key={index} className="flex items-center">
                      <span className="mr-2">
                        {new Date(status.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductHistoryScreen;
