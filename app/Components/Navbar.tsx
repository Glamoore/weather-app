"use client";
// Imports
import React from "react";
import ThemeMenu from "./ThemeMenu/ThemeMenu";
import SearchBar from "./SearchBar/SearchBar";

function Navbar() {
  return (
    <div className="flex items-center justify-between-full py-4">
      <div className="left"></div>
      <div className="searchBar-container flex shrink-0 w-full gap-2 sm:w-fit ">
      <div className="btn-group btn-group flex items-center gap-9">
        <SearchBar />
        <ThemeMenu />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
