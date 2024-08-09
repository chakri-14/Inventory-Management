import React from "react";

function ShowSuccessMesasge({ children }) {
  return (
    <div className="h-full  flex items-center w-full justify-center ">
      <div className=" text-center border-teal-700 bg-teal-300 p-3 w-1/4 border-2 rounded-md">
         {children}
      </div>
    </div>
  );
}

export default ShowSuccessMesasge;
