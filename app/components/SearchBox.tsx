"use client";

import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { classNames } from "@component/utils/general";

type Props = {
  clickedSearchItem: number | null;
  setClickedSearchItem: (e: number | null) => void;
};
const SearchBox = (props: Props) => {
  const { clickedSearchItem, setClickedSearchItem } = props;
  return (
    <>
      {!clickedSearchItem ? (
        <div className="hidden min-[420px]:flex relative w-96 h-12 border border-solid border-neutral rounded-3xl shadow hover:shadow-md flex justify-between items-center mx-auto group">
          <button onClick={() => setClickedSearchItem(1)} className="h-full">
            <span className="font-medium text-sm ml-6">Anywhere</span>
          </button>
          <span className="bg-gray-300 w-px h-3/5"></span>
          <button onClick={() => setClickedSearchItem(2)} className="h-full">
            <span className="font-medium text-sm">Any week</span>
          </button>
          <span className="bg-gray-300 w-px h-3/5"></span>
          <button onClick={() => setClickedSearchItem(3)} className="h-full">
            <span className="text-sm">Add guests</span>
          </button>
          <button
            onClick={() => setClickedSearchItem(1)}
            className="flex bg-rose-500 rounded-full w-8 h-8 justify-center items-center mr-2"
          >
            <MagnifyingGlassIcon
              className="block h-4 w-4 text-white stroke-3"
              aria-hidden="true"
            />
          </button>
        </div>
      ) : (
        <div className="flex justify-center gap-2 z-10 max-[950px]:w-full hidden md:flex">
          <div onClick={() => setClickedSearchItem(1)}>
            <a
              href="#"
              className={classNames(
                clickedSearchItem === 1
                  ? "border-b-2 border-black hover:border-gray-400"
                  : "",
                "block mx-3 py-2 text-sm text-gray-700 font-normal h-10 flex items-center hover:text-gray-400 hover:border-b-2"
              )}
            >
              Stays
            </a>
          </div>
          <div onClick={() => setClickedSearchItem(2)}>
            <a
              href="#"
              className={classNames(
                clickedSearchItem === 2
                  ? "border-b-2 border-black hover:border-gray-400"
                  : "",
                "block mx-3 py-2 text-sm text-gray-700 font-normal h-10 flex items-center hover:text-gray-400 hover:border-b-2"
              )}
            >
              Experiences
            </a>
          </div>
          <div onClick={() => setClickedSearchItem(3)}>
            <a
              href="#"
              className={classNames(
                clickedSearchItem === 3
                  ? "border-b-2 border-black hover:border-gray-400"
                  : "",
                "block mx-3 py-2 text-sm text-gray-700 font-normal h-10 flex items-center hover:text-gray-400 hover:border-b-2"
              )}
            >
              Online Experiences
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBox;
