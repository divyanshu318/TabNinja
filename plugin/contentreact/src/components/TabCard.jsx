import React, { useState } from "react";
import { IoIosOpen } from "react-icons/io";
import { IoCloseCircleSharp } from "react-icons/io5";
import { GiPin } from "react-icons/gi";
import { IoDuplicate } from "react-icons/io5";
import { TbHexagonLetterA } from "react-icons/tb";
import { RiUnpinFill } from "react-icons/ri";
import { TbHexagonLetterD } from "react-icons/tb";
import { FaWindowClose } from "react-icons/fa";
import { FaBookmark } from "react-icons/fa6";
import { BsIncognito } from "react-icons/bs";
import { BsWindowPlus } from "react-icons/bs";
import { GoBookmarkSlashFill } from "react-icons/go";
import { FaStar } from "react-icons/fa";
import { MdPlaylistAddCircle } from "react-icons/md";


const TabCard = ({
    tab,
    port,
    setDisplayPanel,
    setMessage,
    setSelectedTab,
    setDisplayMain,
})=>{
    const [isVisible, setIsVisible] = useState(false);

        const handleChangeTabClick = ()=>{
            setDisplayPanel(false);
            const changeActiveTab = {
                id:7,
                tabId : tab.id,
                windowId: tab.windowId,
            };
            port.postMessage(changeActiveTab);
        };

        const pinTab = () => {
            const PinParticularTab = {
                id: 3,
                tabId: tab.id,
            };
            port.postMessage(PinParticularTab);
        };

        const unPinTab = () => {
            const UnpinParticularTab = {
                id: 4,
                tabId: tab.id,
            };
            port.postMessage(UnpinParticularTab);
        };

        const duplicateTab = () => {
            const DuplicateParticularTab = {
                id: 5,
                tabId: tab.id,
            };
            port.postMessage(DuplicateParticularTab);
        };

        const bookMarkTab = () => {
            const bookmarkTab = {
                id: 15,
                tabId: tab.id,
            };
            port.postMessage(bookmarkTab);
        };

        const unbookMarkTab = () => {
            const unBookmarkTab = {
                id: 18,
                tabUrl: tab.url,
            };
            port.postMessage(unBookmarkTab);
        };

        const addToGroup = () => {
            console.log("clicked");
            setSelectedTab(tab);
            setDisplayMain("group");
        };

        const openTabinNewWindow = () => {
            const openTabinNewwindow = {
                id: 17,
                tabId: tab.id,
            };
            port.postMessage(openTabinNewwindow);
        };

        const openTabinIncognito = () => {
            const openInIncognito = {
                id: 16,
                tabId: tab.id,
            };
            port.postMessage(openInIncognito);
        };

        const starMarkedAtab = () => {
            const starMark = {
                id: 19,
                tabId: tab.id,
            };
            port.postMessage(starMark);
        };

        const starUnmarkTab = () => {
            const unstar = {
                id: 20,
                tabId: tab.id,
            };
            port.postMessage(unstar);
        };

        const deleteParticluarTabClick = () => {
            const deleteParticularTab = {
                id: 2,
                tabId: tab.id,
            };
            port.postMessage(deleteParticularTab);
        };

        const closeAllTabsExcept = () => {
            const closeAllTabsExcept = {
                id: 9,
                tabId: tab.id,
            };
            port.postMessage(closeAllTabsExcept);
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
                    <img src={tab?.favIconUrl} className="w-[50px]" />
                </div>
                {!isVisible && (
                    <p className="p-2 text-white font-semibold text-lg text-center">
                        {tab.title.length > 13 ? tab.title.substring(0, 13) + "..." : tab.title}
                    </p>
                )}
                <div
                    className={`text-lg grid grid-cols-5 grid-rows-2 gap-1 absolute bottom-0 left-0 p-2 h-[50%] w-full bg-black/80 rounded-b-2xl transition-all duration-500 text-white ${
                        isVisible ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <div
                        className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
                        onClick={handleChangeTabClick}
                        onMouseEnter={() => {
                            setMessage("Change Tab");
                        }}
                        onMouseLeave={() => {
                            setMessage("");
                        }}
                    >
                        <IoIosOpen/>
                    </div>
                    {!tab?.pinned && (
                        <div
                            className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
                            onClick={pinTab}
                            onMouseEnter={() => {
                                setMessage("Pin Tab");
                            }}
                            onMouseLeave={() => {
                                setMessage("");
                            }}
                        >
                            <GiPin />
                        </div>
                    )}
                    {tab?.pinned && (
                        <div
                            className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
                                onClick={unPinTab}
                                onMouseEnter={() => {
                                    setMessage("Unpin Tab");
                                }}
                                onMouseLeave={() => {
                                    setMessage("");
                                }}
                        >
                            <RiUnpinFill />
                        </div>
                    )}
                    <div
                        className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
                        onClick={duplicateTab}
                        onMouseEnter={() => {
                            setMessage("Duplicate current tab");
                        }}
                        onMouseLeave={() => {
                            setMessage("");
                        }}
                    >
                        <IoDuplicate />
                    </div>
                    {!tab?.isTabBookMarked && (
                    <div
                        className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
                        onClick={bookMarkTab}
                        onMouseEnter={() => {
                            setMessage("Bookmark Tab");
                        }}
                        onMouseLeave={() => {
                            setMessage("");
                        }}
                    >
                        <FaBookmark />
                    </div>
                    )}
                    {tab?.isTabBookMarked && (
                    <div
                        className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
                        onClick={unbookMarkTab}
                        onMouseEnter={() => {
                            setMessage("Remove Bookmark");
                        }}
                        onMouseLeave={() => {
                            setMessage("");
                        }}
                    >
                        <GoBookmarkSlashFill />
                    </div>
                    )}
                    <div
                        className="flex justify-center items-center  p-2 hover:bg-gray-500 rounded-md"
                        onClick={addToGroup}
                        onMouseEnter={() => {
                        setMessage("Add to Group");
                        }}
                        onMouseLeave={() => {
                        setMessage("");
                        }}
                    >
                        <MdPlaylistAddCircle />
                    </div>
                    <div
                        className="flex justify-center items-center  p-2 hover:bg-gray-500 rounded-md"
                        onClick={openTabinNewWindow}
                        onMouseEnter={() => {
                            setMessage("Open tab in New Window");
                        }}
                        onMouseLeave={() => {
                            setMessage("");
                        }}
                    >
                        <BsWindowPlus />
                    </div>
                    <div
                        className="flex justify-center items-center  p-2 hover:bg-gray-500 rounded-md"
                        onClick={openTabinIncognito}
                        onMouseEnter={() => {
                            setMessage("Open tab in Incognito");
                        }}
                        onMouseLeave={() => {
                            setMessage("");
                        }}
                    >
                        <BsIncognito />
                    </div>
                    <div
                        className={`flex justify-center items-center  p-2 ${
                            tab.isStarMarked ? "text-amber-500" : ""
                        } hover:bg-gray-500 rounded-md`}
                        onClick={() => {
                            !tab.isStarMarked ? starMarkedAtab() : starUnmarkTab();
                        }}
                        onMouseEnter={() => {
                            setMessage("Add/Remove from working list");
                        }}
                        onMouseLeave={() => {
                            setMessage("");
                        }}
                    >
                        <FaStar />
                    </div>

                    <div
                        className="flex justify-center items-center p-2 hover:bg-gray-500 rounded-md"
                        onClick={deleteParticluarTabClick}
                        onMouseEnter={() => {
                            setMessage("Remove Tab");
                        }}
                        onMouseLeave={() => {
                            setMessage("");
                        }}
                    >
                        <IoCloseCircleSharp />
                    </div>
                    <div
                        className="flex justify-center items-center  p-2 hover:bg-gray-500 rounded-md"
                        onClick={closeAllTabsExcept}
                        onMouseEnter={() => {
                            setMessage("Close all other tabs");
                        }}
                        onMouseLeave={() => {
                            setMessage("");
                        }}
                    >
                        <FaWindowClose />
                    </div>
                </div>
                <div className="absolute top-0 left-0 p-2 w-full flex flex-wrap text-white">
                    {tab?.active && (
                        <div className="bg-lime-500 p-1 mx-1 rounded-full flex justify-center items-center">
                            <TbHexagonLetterA />
                        </div>
                    )}
                    {tab?.pinned && (
                        <div className="bg-amber-500 p-1 mx-1 rounded-full flex justify-center items-center">
                            <GiPin />
                        </div>
                    )}
                    {tab?.duplicate && (
                        <div className="bg-rose-500 p-1 mx-1 rounded-full flex justify-center items-center">
                            <TbHexagonLetterD />
                        </div>
                    )}
                    {tab?.isTabBookMarked && (
                        <div className=" bg-blue-500 p-1 mx-1 rounded-full flex justify-center items-center">
                            <FaBookmark />
                        </div>
                    )}
                    </div>
            </div>
        </>
    )
}