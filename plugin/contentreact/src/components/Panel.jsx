import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import toast, { Toaster } from "react-hot-toast";
import GroupTab from "./GroupTab";
import Groups from "./Groups"
import Tabs from "./Tabs";
import CreateGroupComponent from "./CreateGroupComponent";
import NavigationMenu from "./NavigationMenu";
import InfoDisplayPanel from "./InfoDisplayPanel";

const Panel = ()=>{
    const [displayPanel, setDisplayPanel] = useState(false);
    const [search, setSearch] = useState("");
    const [displayMain, setDisplayMain] = useState("tabs");
    const [searchedTabs, setSearchedTabs] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedTab, setSelectedTab] = useState(null);
    const [searchedGroups, setSearchedGroups] = useState([]);
    const [groupId, setGroupId] = useState(null);
    const port = chrome.runtime.connect({ name: "tabify" });

    useEffect(() => {
        //getting all tabs
        getAllTabsInfo();
        getCurrentWindowVariable();
        getStarWindowVariable();
    }, []);

    const getAllTabsInfo = () => {
        const getAllTabs = {
            id: 1,
        };
        port.postMessage(getAllTabs);
    };

    const getCurrentWindowVariable = () => {
        const getWindowVariable = {
            id: 14,
        };
        port.postMessage(getWindowVariable);
    };

    const getStarWindowVariable = () => {
        const starWindowVar = {
            id: 21,
        };
        port.postMessage(starWindowVar);
    };

    return(
        <>
            {displayPanel && (
                <div className="z-[999999] fixed top-0 left-0 h-screen w-screen flex justify-center items-center">
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        toastOptions={{ duration: 3000 }}
                    />
                    <div className="h-[80%] w-[80%] backdrop-blur-md bg-black/20 rounded-2xl shadow-md">
                        <SearchBar search={search} setSearch={setSearch} />
                        {displayMain === "tabs" && (
                        <Tabs
                            tabs={searchedTabs}
                            port={port}
                            setDisplayPanel={setDisplayPanel}
                            setMessage={setMessage}
                            setSelectedTab={setSelectedTab}
                            setDisplayMain={setDisplayMain}
                        />
                        )}
                        {displayMain === "createGroup" && (
                        <CreateGroupComponent
                            port={port}
                            setDisplayMain={setDisplayMain}
                        />
                        )}
                        {displayMain === "group" && (
                        <Groups
                            groups={searchedGroups}
                            port={port}
                            selectedTab={selectedTab}
                            setDisplayMain={setDisplayMain}
                            setMessage={setMessage}
                            setGroupId={setGroupId}
                        />
                        )}
                        {displayMain === "groupTab" && (
                        <GroupTab
                            groupTabs={searchedGroupTabs}
                            setMessage={setMessage}
                            port={port}
                            groupId={groupId}
                        />
                        )}
                        {displayMain === "AddGroupLink" && (
                            <AddGroupViaLink port={port} setDisplayMain={setDisplayMain} />
                        )}
                        <NavigationMenu
                            port={port}
                            tabs={tabs}
                            windowVariable={windowVariable}
                            setWindowVariable={setWindowVariable}
                            setMessage={setMessage}
                            setDisplayStarTabs={setDisplayStarTabs}
                            displayStarTabs={displayStarTabs}
                            displayMain={displayMain}
                            setDisplayMain={setDisplayMain}
                            setSelectedTab={setSelectedTab}
                        />
                    </div>
                    <InfoDisplayPanel message={message} />
                </div>
            )}
        </>
    )
}

export default Panel;