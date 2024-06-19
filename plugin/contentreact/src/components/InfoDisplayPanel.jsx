import React from "react";

const InfoDisplayPanel = ({ message}) => {
  return (
    <>
      {message !== "" && (
        <div className="absolute right-0 bottom-0 px-8 py-2 m-2 mr-4 bg-black/70 text-white text-sm rounded-full">
          {message}
        </div>
      )}
    </>
  );
};

export default InfoDisplayPanel;
