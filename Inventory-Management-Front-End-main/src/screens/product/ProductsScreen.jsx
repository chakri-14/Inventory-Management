import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import LoadingIndicator from "../../components/LoadingIndicator";
import { ImEqualizer } from "react-icons/im";
import { Link, NavLink, useOutletContext } from "react-router-dom";
import { SERVER_URL } from "../../router";

function ProductsScreen() {
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, searchTerm]);

  async function fetchData() {
    try {
      const response = await axios.get(
        `${SERVER_URL}/api/v1/products`,
        {
          params: {
            page: currentPage,
            itemsperpage: itemsPerPage,
            search: searchTerm,
          },
        }
      );
      setProducts(response.data.data);
      setTotalPages(response.data.pages_count);
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
        <h1 className="text-3xl font-semibold text-neutral-900">Products</h1>
        <p className="text-lg text-neutral-600">
          Here are the products created by you!
        </p>
      </div>
      <br />
      <div className="flex gap-3 items-center justify-between">
        <div className="flex gap-4">
          <input
            type="text"
            className="outline-none px-3 py-1 border-neutral-500 border-2 rounded-md text-lg"
            placeholder="Search products"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* <div className="flex w-min gap-2 items-center text-lg font-semibold text-neutral-800 hover:bg-teal-50 hover:text-teal-800 px-4 py-1 border rounded-md">
            <ImEqualizer />
            <span>Filter</span>
          </div> */}
        </div>
        <NavLink
          className={
            "text-lg font-semibold text-neutral-800 hover:bg-teal-50 hover:text-teal-800 px-4 py-1 border rounded-md"
          }
          to={"new"}
        >
          Create Product
        </NavLink>
      </div>
      <br />

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
                <th className="px-4 py-2">HISTORY</th>
                <th className="px-4 py-2">ACTION</th>
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
                products.map((product, idx) => (
                  <ProductRow
                    key={product._id}
                    index={idx}
                    product={product}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                  />
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

export function ProductRow({ product, index, currentPage, itemsPerPage }) {
  // console.log(product)
  const [_, user] = useOutletContext();
  return (
    <tr className="border-b hover:bg-teal-50 hover:text-teal-700">
      <td className="px-4 py-2 flex gap-3 items-center">
        <h1 className="font-semibold ">
          {index + 1 + (currentPage - 1) * itemsPerPage}
        </h1>
        <div className="px-4 py-2 flex flex-col">
          <h5 className="text-lg font-semibold text-zinc-800">
            {product.title}
          </h5>
          <p className="text-neutral-600  line-clamp-1  text-sm">
            {/* {product.description} */}
            {product.manufacturer.name}
          </p>
        </div>
      </td>
      <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
        {product.serialNo}
      </td>
      <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
        {product.user}
      </td>
      <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
        {product.isPart ? "TRUE" : "FALSE"}
      </td>
      <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
        {product.rackMountable ? "TRUE" : "FALSE"}
      </td>
      <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
        {product.dateOfPurchase.split("T")[0]}
      </td>
      <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
        {product.model}
      </td>
      <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
        {product.warrantyMonths}
      </td>
      <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
        <Link
          to={`history/${product._id}`}
          className=" px-4 py-1 bg-neutral-800 text-slate-100 text-sm rounded-md hover:bg-neutral-600 hover:scale-95 transition-transform"
        >
          View
        </Link>
      </td>
      <td className="px-4 py-2 text-neutral-700 font-semibold text-sm">
        <NavLink
        
          to={user._id !== product.createdBy? "":`edit/${product._id}`}
          className=" px-4 py-1 bg-neutral-800 text-slate-100 text-sm rounded-md hover:bg-neutral-600 hover:scale-95 transition-transform"
        >
          {user._id === product.createdBy ? "Edit" : "Action Not allowed"}
        </NavLink>
      </td>
    </tr>
  );
}

export default ProductsScreen;
 