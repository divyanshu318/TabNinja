import React, { useEffect } from "react";
import GroupCard from "./GroupCard";

const Groups = ({ groups, port, selectedTab, setDisplayMain ,setMessage , setGroupId}) => {
  useEffect(() => {
    const getAllGroups = {
      id: 24,
    };
    port.postMessage(getAllGroups);
  }, []);
  return (
    <>
      <div className="tabify w-full grid grid-cols-5 gap-2 h-[60vh] overflow-y-auto">
        {groups.map((group) => {
          return (
            <GroupCard
              group={group}
              port={port}
              selectedTab={selectedTab}
              setDisplayMain={setDisplayMain}
              setMessage ={setMessage}
              setGroupId={setGroupId}
            />
          );
        })}
      </div>
    </>
  );
};

export default Groups;
