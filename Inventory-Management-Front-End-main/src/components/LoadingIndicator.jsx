import React from "react";

function LoadingIndicator() {
  return (
    <div className="h-full  flex items-center w-full justify-center ">
      <div className="w-16 aspect-square border-2 border-t-neutral-950 border-b-neutral-950 border-r-neutral-950 animate-spin rounded-full"></div>
    </div>
  );
}

export default LoadingIndicator;
