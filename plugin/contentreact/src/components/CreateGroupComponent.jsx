import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateGroupComponent = ({port, setDisplayMain})=>{

    const [groupName, setGroupName] = useState("");

    const handleCreateGroupClick = () => {
        if (groupName === "") {
            toast.error("group name can not be empty");
            return;
        }
        setDisplayMain("tabs");
        const createGroup = {
            id: 23,
            groupName: groupName,
        };
        port.postMessage(createGroup);
    };

    return (
        <div className="w-full h-[60vh] flex justify-center items-center">
            <div className="p-4 border-2 border-white rounded-lg">
                <div className="flex flex-row justify-center items-center ">
                <input
                    type="text"
                    placeholder="group name"
                    className="p-2 rounded-lg w-[20vw]"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                />
                <div
                    onClick={() => handleCreateGroupClick()}
                    className="p-2 bg-lime-600 ml-2 text-white rounded-lg hover:bg-lime-700 cursor-pointer"
                >
                    Create
                </div>
                </div>
            </div>
        </div>
    )
}

export default CreateGroupComponent;