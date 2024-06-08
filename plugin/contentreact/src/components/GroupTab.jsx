import React from "react";
import GroupTabCard from "./GroupTabCard";

const GroupTab = ({ groupTabs, setMessage, port ,groupId }) => {
  return (
    <>
      <div className="tabify w-full grid grid-cols-5 gap-2 h-[60vh] overflow-y-auto">
        {groupTabs.map((tab) => {
          return (
            <GroupTabCard
              tab={tab}
              setMessage={setMessage}
              port={port}
              groupId={groupId}
            />
          );
        })}
      </div>
    </>
  );
};

export default GroupTab;
