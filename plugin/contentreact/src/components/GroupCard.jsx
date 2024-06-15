import React, { useState } from "react";
import { IoMdArrowDropupCircle } from "react-icons/io";
import { MdDelete, MdGroup } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import toast from "react-hot-toast";

const GroupCard = ({
    group,
    port,
    selectedTab,
    setDisplayMain,
    setMessage,
    setGroupId,
}) => {

    const [isVisible, setIsVisible] = useState(false);

    const handleCardClick = () => {
        if (selectedTab) {
            const addTabToGroup = {
                id: 25,
                tab: selectedTab,
                groupId: group._id,
            };
            port.postMessage(addTabToGroup);
            } else {
            const fetchTabsData = {
                id: 26,
                groupId: group._id,
            };
            port.postMessage(fetchTabsData);
            setGroupId(group._id);
            setDisplayMain("groupTab");
        }
    };

    const openAllGroupTabs = () => {
        const openAllTabs = {
            id: 29,
            groupId: group._id,
        };
        port.postMessage(openAllTabs);
    };

    const deleteGroup = () => {
        const deleteG = {
            id: 30,
            groupId: group._id,
        };
        port.postMessage(deleteG);
    };

    const handleLink = () => {
        navigator.clipboard.writeText(group?.url);
        toast.success("link copied to clipboard");
    };
    return (
        <>
            {selectedTab && (
                <div
                onClick={handleCardClick}
                className="relative bg-black/40 h-[25vh]  m-4 p-2 grid grid-cols-1 rounded-2xl shadow-md cursor-pointer hover:bg-black/50 hover:border hover:border-white transition-colors duration-100"
                >
                <div className="flex justify-center items-center">
                    <p className="p-2 text-white font-semibold text-lg">{group.name}</p>
                </div>
                </div>
            )}
            {!selectedTab && (
                <div
                    onMouseEnter={() => {
                        setIsVisible(true);
                    }}
                    onMouseLeave={() => {
                        setIsVisible(false);
                    }}
                    className="relative bg-black/40 h-[25vh]  m-4 p-2 grid grid-cols-1 rounded-2xl shadow-md cursor-pointer hover:bg-black/50 hover:border hover:border-white transition-colors duration-100"
                >
                    <div className="flex justify-center items-center">
                        <p className="p-2 text-white font-semibold text-lg">{group.name}</p>
                    </div>
                    {!selectedTab && (
                        <div
                            className={`text-lg grid grid-cols-5 grid-rows-1 gap-1 absolute bottom-0 left-0 p-2 h-[25%] w-full bg-black/80 rounded-b-2xl transition-all duration-500 text-white ${
                            isVisible ? "opacity-100" : "opacity-0"
                        }`}
                        >
                            <div
                                className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
                                onClick={handleCardClick}
                                onMouseEnter={() => {
                                    setMessage("View tabs");
                                }}
                                onMouseLeave={() => {
                                    setMessage("");
                                }}
                            >
                                <FaEye />
                            </div>
                            <div
                                className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
                                onClick={openAllGroupTabs}
                                onMouseEnter={() => {
                                    setMessage("Add all tabs to working area");
                                }}
                                onMouseLeave={() => {
                                    setMessage("");
                                }}
                            >
                                <IoMdArrowDropupCircle />
                            </div>
                            <div
                                className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
                                onClick={handleLink}
                                onMouseEnter={() => {
                                    setMessage("Get link");
                                }}
                                onMouseLeave={() => {
                                    setMessage("");
                                }}
                            >
                                <FaLink />
                            </div>
                            <div
                                className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
                                onClick={deleteGroup}
                                onMouseEnter={() => {
                                    setMessage("Delete Group");
                                }}
                                onMouseLeave={() => {
                                    setMessage("");
                                }}
                            >
                                <MdDelete />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default GroupCard;
