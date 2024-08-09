import React, { useEffect, useState } from "react";
import HeaderBar from "../../components/HeaderBar";
import { Link, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import DashBoardScreen from "./DashBoardScreen";
import loginLogo from "../../assets/authenticate.svg";
import SideNavbar from "../../components/SideNavbar";
import { SERVER_URL } from "../../router";

function DashBoardLayout() {
  const navigator = useNavigate();
  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserInfo();
  }, []);
  const fetchUserInfo = async () => {
    try {
      const { data, status } = await axios.get(
        `${SERVER_URL}/api/v1/users/me`,

        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      if (status === 400) {
        // navigator("/auth");
      }
      if (status === 200) {
        setData(data);
        setUser(data.user);
        setLoading(false);
      }
    } catch (e) {
      // navigator("/auth");
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {!data && <br />}
      {!data && (
        <div className=" container mx-auto w-2/4 text-center mb-3 px-3 py-1 border-2 border-yellow-600 bg-yellow-100 rounded-md text-yellow-800">
          Your are not authenticated please login to continue
        </div>
      )}

      {/* loading spinner  animation  */}
      {isLoading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col gap-4">
            <div className="h-12  w-12 border-b-2 border-l-2 border-r-2 border-black border-t-white animate-spin rounded-full"></div>
            <h1 className="font-semibold animate-pulse"> Loading</h1>
          </div>
        </div>
      )}

      {/* showing the data from data base  */}
      {data && <HeaderBar user={data.user} />}
      {data && (
        <div className="grid grid-rows-10 grid-cols-10 lg:grid-cols-12 gap-2 h-screen w-full overflow-y-hidden ">
          <div className="h-14 bg-red-400 col-span-10 lg:col-span-12"></div>

          <div className="row-span-9 overflow-y-auto col-span-3  lg:col-span-2 h-full  ">
            <SideNavbar />
          </div>

          <div className="row-span-9 overflow-y-auto col-span-7 lg:col-span-10 h-full  ">
            <Outlet context={[data, user]} />
          </div>
        </div>
      )}

      {/* home screen logout component */}
      {!data && (
        <div className="min-h-screen flex items-center justify-center">
          <div class="relative">
            <img src={loginLogo} alt="Image" class="block w-full" />
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center   text-white p-4">
              <Link
                to={"auth"}
                className="px-6 py-2 animate-pulse rounded-md text-lg  bg-blue-800"
              >
                Login Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DashBoardLayout;
