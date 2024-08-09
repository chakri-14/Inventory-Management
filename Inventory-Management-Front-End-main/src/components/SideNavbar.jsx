import React from "react";
import { Link, NavLink } from "react-router-dom";

import { FaBlog, FaSleigh, FaTools } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { AiFillProduct } from "react-icons/ai";

import { LuShoppingBag } from "react-icons/lu";
import { MdCategory } from "react-icons/md";
import { SiBrandfolder } from "react-icons/si";
import { BsCollectionFill, BsTools } from "react-icons/bs";

import { FcAdvertising, FcDepartment, FcExpired, FcReuse } from "react-icons/fc";
import { RiAdminFill, RiCoupon2Fill } from "react-icons/ri";

import { IoIosSettings } from "react-icons/io";
import { FcRatings } from "react-icons/fc";
import { FaUserAlt } from "react-icons/fa";
import { BiCart, BiLocationPlus, BiUser } from "react-icons/bi";
import LogoutButton from "./LogoutButton";
import { IoCodeWorking } from "react-icons/io5";

function SideNavbar() {
  const quickLinks = {
    title: "QUICK LINKS",
    links: [
      { link: "", name: "Dashboard", icon: <IoMdHome />, end: true },
      {
        link: "/products/new",
        name: "New Product",
        icon: <AiFillProduct />,
        end: true,
      },
      {
        link: "/brands/new",
        name: "New Brand",
        icon: <FaBlog />,
        end: true,
      },
      {
        link: "/locations/new",
        name: "New Location",
        icon: <BiLocationPlus />,
        end: true,
      },
    ],
  };
  const catalogLinks = {
    title: "CATALOG",
    links: [
      {
        link: "/products",
        name: "Products",
        icon: <LuShoppingBag />,
        end: false,
      },
      { link: "/brands", name: "Brands", icon: <SiBrandfolder />, end: false },
      {
        link: "/locations",
        name: "Locations",
        icon: <BiLocationPlus />,
        end: false,
      },
      { link: "/users", name: "User Management", icon: <BiUser />, end: false },
    ],
  };
  const DetailsLinks = {
    title: "Histroy",
    links: [
      
      { link: "/used-by-admin", name: "Used By Admin", icon: <RiAdminFill />, end: true },
      { link: "/used-by-department", name: "Used By Department", icon: <FcDepartment />, end: true },
      { link: "/used-by-normal-user", name: "Used By Normal User", icon: <FcReuse />, end: true },

      { link: "/inwarranty", name: "In Warranty", icon: <FcExpired />, end: true },
      { link: "/notwarranty", name: "Not-In Warranty", icon: <FcExpired />, end: true },

      { link: "/in-repair", name: "In Repair", icon: <BsTools />, end: true },
      { link: "/not-in-use", name: "Not-In Repair", icon: <FaTools />, end: true },
      { link: "/in-use", name: "In Use", icon: <IoCodeWorking />, end: true },
    ],
  };

  const links = [quickLinks, catalogLinks,DetailsLinks];
  return (
    <div className="h-full flex flex-col pr-1 overflow-y-scroll  scrollbar scroll-smooth ">
      {links.map((link, index) => (
        <div key={index} className="my-4">
          <h3 className="px-4 text-sm font-semibold text-slate-700">
            {link.title}
          </h3>
          <div className="flex flex-col flex-grow gap-1 mt-2">
            {link.links.map((_link, idx) => (
              <NavLink
                end={_link.end}
                key={idx}
                to={_link.link}
                className={(prop) =>
                  `${
                    prop.isActive
                      ? "text-teal-600 border-l-4 border-l-teal-600 rounded-sm bg-slate-50"
                      : "hover:bg-slate-50 hover:text-teal-800"
                  } pl-6 py-2 font-semibold text-slate-700 flex items-center gap-3`
                }
              >
                {_link.icon}
                <span>{_link.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      ))}
     <hr />
      

      <LogoutButton />
    </div>
  );
}

export default SideNavbar;

{
  /* <div className="align-bottom left-0 w-full bottom-0">
          <Link
            to=""
            className={
              " pl-6 py-2 font-semibold text-slate-700 flex items-center gap-3 bg-white "
            }
          >
            <IoIosSettings />
            <span>Settings</span>
          </Link>
        </div>
      </div> */
}
