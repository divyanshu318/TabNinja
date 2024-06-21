import React, { useState } from "react";
import toast from "react-hot-toast";
import { GrFormAdd } from "react-icons/gr";

const AddGroupViaLink = ({ port, setDisplayMain }) => {
const [link, setLink] = useState("");

const handleAddGroupButton = () => {
    if (link === "") {
        toast.error("Enter link first");
        return;
    }
    setDisplayMain("tabs");
    const AddGroup = {
        id: 31,
        url: link,
    };
    port.postMessage(AddGroup);
};
return (
    <div className="w-full h-[60vh] flex justify-center items-center">
        <div className="p-4 border-2 border-white rounded-lg">
            <div className="flex flex-row justify-center items-center ">
            <input
                type="text"
                placeholder="Enter group url"
                className="p-2 rounded-lg w-[20vw]"
                value={link}
                onChange={(e) => setLink(e.target.value)}
            />
            <div
                onClick={() => handleAddGroupButton()}
                className="p-2 bg-lime-600 ml-2 text-white rounded-lg hover:bg-lime-700 cursor-pointer"
            >
                <GrFormAdd />
            </div>
            </div>
        </div>
    </div>
);
};

export default AddGroupViaLink;
