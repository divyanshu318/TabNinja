import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import toast, { Toaster } from "react-hot-toast";

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
                    </div>
                </div>
                
            )}
        </>
    )
}

export default Panel;