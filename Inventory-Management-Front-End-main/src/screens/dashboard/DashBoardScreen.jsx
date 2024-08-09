import axios from "axios";
import React, { useEffect, useState } from "react"; 
import { Link, useOutletContext } from "react-router-dom";
import AnalyticsComponent from "./components/AnalyticsComponent";
import WarrantyExpiringProductsTablesComponent from "../../components/WarrantyExpiringProductsTableComponent";

function DashBoardScreen() {
  // const [data] = useOutletContext();
  // // console.log("data ", data)

  return (
    <div className=" h-full w-full px-10">
      <br />
      <AnalyticsComponent  />
      <WarrantyExpiringProductsTablesComponent />
    </div>
  );
}

export default DashBoardScreen;
