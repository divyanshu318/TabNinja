import React, { useState } from "react";
import { CgInsertAfterR } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { VscVmActive } from "react-icons/vsc";


const GroupTabCard = ({tab, setMessage, port, groupId}) =>{
    const [isVisible, setIsVisible] = useState(false);
    
    const addTabToWorkingArea = () => {
        const addTab = {
            id: 27,
            url: tab.url,
        };
        port.postMessage(addTab);
    };

    const deleteTabFromGroup = () => {
    const deleteTab = {
      id: 28,
      tabId: tab._id,
      groupId: groupId,
    };
    port.postMessage(deleteTab);
  };
    return(
        <>
            <div
                className="relative bg-black/40 h-[25vh]  m-4 p-2 grid grid-rows-2 rounded-2xl shadow-md cursor-pointer hover:bg-black/50 hover:border hover:border-white transition-colors duration-100"
                onMouseEnter={() => {
                    setIsVisible(true);
                }}
                onMouseLeave={() => {
                    setIsVisible(false);
                }}
            >
            <div className="p-2 w-full flex justify-center items-center">
                <img src={tab?.favicon} className="w-[50px]" />
                </div>
                {!isVisible && (
                    <p className="p-2 text-white font-semibold text-lg text-center">
                        {tab.name.length > 13
                        ? tab.name.substring(0, 13) + "..."
                        : tab.name}
                    </p>
                )}
                <div
                    className={`text-lg grid grid-cols-5 grid-rows-1 gap-1 absolute bottom-0 left-0 p-2 h-[25%] w-full bg-black/80 rounded-b-2xl transition-all duration-500 text-white ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div
                        className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
                        onClick={addTabToWorkingArea}
                        onMouseEnter={() => {
                            setMessage("Add Tab to working Area");
                        }}
                        onMouseLeave={() => {
                            setMessage("");
                        }}
                    >
                        <CgInsertAfterR />
                    </div>
                    <div
                        className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
                        onClick={deleteTabFromGroup}
                        onMouseEnter={() => {
                            setMessage("Delete Tab from Group");
                        }}
                        onMouseLeave={() => {
                            setMessage("");
                        }}
                    >
                        <MdDelete />
                    </div>
                </div>
                <div className="absolute top-0 left-0 p-2 w-full flex flex-wrap text-white">
                {tab?.isPresent && (
                    <div className="bg-lime-500 p-1 mx-1 rounded-full flex justify-center items-center">
                    <VscVmActive />
                    </div>
                )}
                </div>
            </div>
        </>
    )
}

export default GroupTabCard;