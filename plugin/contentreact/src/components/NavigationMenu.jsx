import React from "react";
import { RiDeleteBinFill } from "react-icons/ri";
import { HiMiniWindow } from "react-icons/hi2";
import { FaRegWindowRestore } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { BiAddToQueue } from "react-icons/bi";
import { FaLayerGroup } from "react-icons/fa";
import { MdAddLink } from "react-icons/md";
import { FaSortAlphaDown } from "react-icons/fa";
import { TbSortDescending2 } from "react-icons/tb";

const NavigationMenu = ({
  port,
  tabs,
  windowVariable,
  setMessage,
  displayStarTabs,
  setDisplayMain,
  displayMain,
  setSelectedTab,
}) => {
  const removeDuplicateTabs = () => {
    const removeDupTabs = {
      id: 12,
      tabs: tabs,
    };
    port.postMessage(removeDupTabs);
  };

  const changeCurrentWindowVariable = (value) => {
    const windowVar = {
      id: 13,
      value: value,
    };
    port.postMessage(windowVar);
  };

  const setStartVariable = (value) => {
    const starVar = {
      id: 22,
      value: value,
    };
    port.postMessage(starVar);
  };

  const sortAlphabetically = () => {
    const sortAZ = {
      id: 32,
    };
    port.postMessage(sortAZ);
  };

  const sortLastAccessed = () => {
    const sortlast = {
      id: 33,
    };
    port.postMessage(sortlast);
  };
  return (
    <>
      <div className="w-full flex justify-between px-2 mt-1">
        <div className="flex justify-center items-center">
          <div
            className="bg-black/60 p-2 mx-1 rounded-full flex justify-center items-center text-lg text-white cursor-pointer hover:bg-black/80 hover:text-amber-500"
            onClick={removeDuplicateTabs}
            onMouseEnter={() => {
              setMessage("Remove all Duplicate Tabs");
            }}
            onMouseLeave={() => {
              setMessage("");
            }}
          >
            <RiDeleteBinFill />
          </div>
          <div
            className={`${
              !windowVariable ? "bg-black/60" : "bg-black/80"
            } p-2 mx-1 rounded-full flex justify-center items-center text-lg text-white cursor-pointer hover:bg-black/80 hover:text-amber-500`}
            onClick={() => changeCurrentWindowVariable(true)}
            onMouseEnter={() => {
              setMessage("Show tabs of current window");
            }}
            onMouseLeave={() => {
              setMessage("");
            }}
          >
            <HiMiniWindow />
          </div>
          <div
            className={`${
              windowVariable ? "bg-black/60" : "bg-black/80"
            } p-2 mx-1 rounded-full flex justify-center items-center text-lg text-white cursor-pointer hover:bg-black/80 hover:text-amber-500`}
            onClick={() => changeCurrentWindowVariable(false)}
            onMouseEnter={() => {
              setMessage("show all tabs");
            }}
            onMouseLeave={() => {
              setMessage("");
            }}
          >
            <FaRegWindowRestore />
          </div>
          <div
            className={`${
              !displayStarTabs ? "bg-black/60" : "bg-black/80"
            } p-2 mx-1 rounded-full flex justify-center items-center text-lg text-white cursor-pointer hover:bg-black/80 hover:text-amber-500`}
            onClick={() => {
              setStartVariable(!displayStarTabs);
            }}
            onMouseEnter={() => {
              setMessage("Show starred tabs");
            }}
            onMouseLeave={() => {
              setMessage("");
            }}
          >
            <FaStar />
          </div>
          <div className="m-1">a</div>
        </div>
        <div className="flex justify-center items-center">
          <div
            className="bg-black/60 p-2 mx-1 rounded-full flex justify-center items-center text-lg text-white cursor-pointer hover:bg-black/80 hover:text-amber-500"
            onClick={sortAlphabetically}
            onMouseEnter={() => {
              setMessage("sort tabs alphabetically");
            }}
            onMouseLeave={() => {
              setMessage("");
            }}
          >
            <FaSortAlphaDown />
          </div>
          <div
            className="bg-black/60 p-2 mx-1 rounded-full flex justify-center items-center text-lg text-white cursor-pointer hover:bg-black/80 hover:text-amber-500"
            onClick={sortLastAccessed}
            onMouseEnter={() => {
              setMessage("sort tabs last Used time");
            }}
            onMouseLeave={() => {
              setMessage("");
            }}
          >
            <TbSortDescending2 />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div
            className="bg-black/60 p-2 mx-1 rounded-full flex justify-center items-center text-lg text-white cursor-pointer hover:bg-black/80 hover:text-amber-500"
            onClick={() => setDisplayMain("tabs")}
            onMouseEnter={() => {
              setMessage("Show Opened Tabs");
            }}
            onMouseLeave={() => {
              setMessage("");
            }}
          >
            <HiMiniWindow />
          </div>
          <div
            className="bg-black/60 p-2 mx-1 rounded-full flex justify-center items-center text-lg text-white cursor-pointer hover:bg-black/80 hover:text-amber-500"
            onClick={() => setDisplayMain("createGroup")}
            onMouseEnter={() => {
              setMessage("Create Group");
            }}
            onMouseLeave={() => {
              setMessage("");
            }}
          >
            <BiAddToQueue />
          </div>
          <div
            className="bg-black/60 p-2 mx-1 rounded-full flex justify-center items-center text-lg text-white cursor-pointer hover:bg-black/80 hover:text-amber-500"
            onClick={() => {
              setDisplayMain("group");
              setSelectedTab(null);
            }}
            onMouseEnter={() => {
              setMessage("View Groups");
            }}
            onMouseLeave={() => {
              setMessage("");
            }}
          >
            <FaLayerGroup />
          </div>
          <div
            className="bg-black/60 p-2 mx-1 rounded-full flex justify-center items-center text-lg text-white cursor-pointer hover:bg-black/80 hover:text-amber-500"
            onClick={() => {
              setDisplayMain("AddGroupLink");
            }}
            onMouseEnter={() => {
              setMessage("Add Group via link");
            }}
            onMouseLeave={() => {
              setMessage("");
            }}
          >
            <MdAddLink />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavigationMenu;
