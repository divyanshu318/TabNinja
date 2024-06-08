import React from "react";

const SearchBar = ({ search, setSearch }) => {
  return (
    <>
      <div className="w-full flex justify-center items-center">
        <input
          type="text"
          placeholder="Search Tab"
          className="px-8 py-4 rounded-full w-[80%] my-4 text-black bg-white"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
    </>
  );
};

export default SearchBar;
