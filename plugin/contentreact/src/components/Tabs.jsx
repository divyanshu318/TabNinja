import React from "react";
import TabCard from "./TabCard";

const Tabs = ({ tabs, port, setDisplayPanel, setMessage , setSelectedTab ,setDisplayMain}) => {
  return (
    <>
      <div className="tabify w-full grid grid-cols-5 h-[60vh] overflow-y-auto">
        {tabs.map((tab) => {
          return (
            <TabCard
              tab={tab}
              port={port}
              setDisplayPanel={setDisplayPanel}
              setMessage={setMessage}
              setSelectedTab={setSelectedTab}
              setDisplayMain={setDisplayMain}
            />
          );
        })}
      </div>
    </>
  );
};

export default Tabs;
