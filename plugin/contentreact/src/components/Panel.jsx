import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import toast, { Toaster } from "react-hot-toast";
import GroupTab from "./GroupTab";
import Groups from "./Groups"
import Tabs from "./Tabs";
import CreateGroupComponent from "./CreateGroupComponent";
import NavigationMenu from "./NavigationMenu";
import InfoDisplayPanel from "./InfoDisplayPanel";
import AddGroupViaLink from './AddGroupViaLink';
const Panel = ()=>{
    const [displayPanel, setDisplayPanel] = useState(false);
    const [search, setSearch] = useState("");
    const [displayMain, setDisplayMain] = useState("tabs");
    const [searchedTabs, setSearchedTabs] = useState([]);
    const [message, setMessage] = useState("");
    const [selectedTab, setSelectedTab] = useState(null);
    const [searchedGroups, setSearchedGroups] = useState([]);
    const [groupId, setGroupId] = useState(null);
    const [simultaneousPress, setSimultaneousPress] = useState(false);
    const [tabs, setTabs] = useState([]);
    const [windowVariable, setWindowVariable] = useState(false);
    const [displayStarTabs, setDisplayStarTabs] = useState(false);
    const [groups, setGroups] = useState([]);
    const [groupTabs, setGroupTabs] = useState([]);
    const port = chrome.runtime.connect({ name: "tabify" });


    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.ctrlKey && event.code === "KeyQ") {
                setSimultaneousPress(true);
            }
        };

        const handleKeyUp = (event) => {
            if (event.code === "KeyQ") {
                setSimultaneousPress(false);
            }
        };

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("keyup", handleKeyUp);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("keyup", handleKeyUp);
        };
    }, []);


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

    useEffect(() => {
        port.onMessage.addListener(function (response) {
        // console.log(response);
        const { id } = response;
        if (id === 1) {
            const { data } = response;
            console.log(data);
            const urlMap = {};

            data.forEach((obj) => {
            if (urlMap[obj.url] === undefined) {
                urlMap[obj.url] = true;
                obj.duplicate = false;
            } else {
                obj.duplicate = true;
            }
            });
            setTabs(data);
        } else if (id === 10) {
            setDisplayPanel(false);
        } else if (id === 14) {
            const { currentWindow } = response;
            setWindowVariable(currentWindow);
        } else if (id === 21) {
            const { showStarTabs } = response;
            setDisplayStarTabs(showStarTabs);
        } else if (id === 23 || id === 31) {
            const { data } = response;
            displayToast(data);
        } else if (id === 24) {
            const { data } = response;
            fillGroups(data);
        } else if (id === 25) {
            const { data } = response;
            displayToast(data);
            setDisplayMain("tabs");
        } else if (id === 26) {
            const { data } = response;
            if (data.success === true) {
            setGroupTabs(data.data.tabs);
            }
        }
        });
    }, [port]);


    useEffect(() => {
        if (simultaneousPress) {
        setDisplayPanel((prevState) => !prevState);
        getAllTabsInfo();
        getCurrentWindowVariable();
        getStarWindowVariable();
        }
    }, [simultaneousPress]);

    useEffect(() => {
        setEffectiveTabs();
    }, [search, tabs, displayStarTabs, effectiveGroupTabs, groups]);

    const displayToast = (data) => {
        if (data.success) {
            toast.success(data.message);
        } else {
            toast.error(data.message);
        }
    };

    const fillGroups = (data) => {
    if (data.success) {
      setGroups(data.data.group_list);
    }
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