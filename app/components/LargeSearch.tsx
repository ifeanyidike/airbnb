"use client";
import React, { useState, useEffect } from "react";
import { classNames } from "@component/utils/general";
import ClickOutside from "./ClickOutside";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MapPinIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getMatchingTopFiveCities } from "@component/utils/logic";
import type { ClickedSearch, LocationType } from "@component/utils/types";
import NumberOfGuests from "./NumberOfGuests";
import DatePicker from "./DatePicker";

const LargeSearch = (props: ClickedSearch) => {
  const { clickedSearchItem, setClickedSearchItem } = props;
  const [menuClicked, toggleMenuClick] = useState<null | number>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const [matchingCities, setMatchingCities] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!searchValue) return;

    const matchingCities: LocationType[] =
      getMatchingTopFiveCities(searchValue);

    setMatchingCities(matchingCities);
  }, [searchValue]);

  const handleClickOutside = () => {
    toggleMenuClick(null);
    setSearchValue("");
    setMatchingCities([]);
    setClickedSearchItem(null);
  };

  const searchComplete = () => {
    setSearchValue("");
    setMatchingCities([]);
  };

  const handleSearch = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    if (!searchValue) return;
    router.push(`/search?loc=${searchValue}`);
  };
  return (
    <ClickOutside
      className={classNames(
        clickedSearchItem ? "" : "min-[420px]:hidden",
        "duration:100 ease-in-out delay:100"
      )}
      handleClick={handleClickOutside}
    >
      <div
        className={classNames(
          menuClicked ? "bg-gray-200" : "",
          "duration:100 ease-in-out delay:100 relative border border-solid border-gray-300 rounded-full max-w-screen-md w-4/5 md:h-16 h-12 mx-auto flex items-center cursor-pointer group text-[13px]"
        )}
      >
        <div
          onClick={() => toggleMenuClick(1)}
          className={classNames(
            menuClicked === 1
              ? "shadow ring-1 ring-gray-600 ring-opacity-5 bg-white"
              : "hover:bg-gray-300",
            "relative w-full md:w-[35%] h-full rounded-full flex items-center pl-7 pr-4 py-3"
          )}
        >
          <div className="flex flex-col relative w-full">
            <h4 className="font-semibold hidden md:block">Where</h4>
            <input
              className="text-gray-500 outline-0 border-0 bg-transparent w-full"
              type="text"
              placeholder="Search destinations"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSearchValue(e.target.value)
              }
              value={searchValue}
            />
            {searchValue && (
              <button
                onClick={() => setSearchValue("")}
                className="absolute top-1/4 -right-2 rounded-full bg-gray-300 p-1"
              >
                <XMarkIcon
                  className="block h-4 w-4 stroke-3"
                  aria-hidden="true"
                />
              </button>
            )}
          </div>

          {matchingCities.length && searchValue ? (
            <div className="flex flex-col gap-2 z-20 absolute min-[420px]:-left-15 -left-10 md:left-0 z-10 top-[72px] py-5 px-3 w-96 origin-top-right rounded-3xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {matchingCities.map((location, index) => (
                <Link
                  onClick={searchComplete}
                  key={index}
                  href={`/search?loc=${location}`}
                  className="flex items-center gap-4 block h-14 px-6 py-3 text-sm text-gray-700 hover:bg-[#F7F7F7]"
                >
                  <div className="bg-gray-200 p-2 rounded-xl">
                    <MapPinIcon className="block h-7 w-7" aria-hidden="true" />
                  </div>
                  <span>{location}</span>
                </Link>
              ))}
            </div>
          ) : null}
        </div>
        {menuClicked !== 1 && menuClicked !== 2 && clickedSearchItem !== 2 && (
          <span className="hidden md:block bg-gray-300 w-px h-3/5 group-hover:hidden"></span>
        )}
        <div
          onClick={() => toggleMenuClick(2)}
          className={classNames(
            menuClicked === 2 || (!menuClicked && clickedSearchItem === 2)
              ? "shadow-lg ring-1 ring-black ring-opacity-5 bg-white"
              : "hover:bg-gray-300",
            "hidden md:flex md:w-[17%]  h-full rounded-full flex items-center px-4"
          )}
        >
          <div className="flex flex-col">
            <h4 className="font-semibold">Check in</h4>
            <span className="text-gray-500">Add dates</span>
          </div>
        </div>
        {menuClicked !== 2 && menuClicked !== 3 && clickedSearchItem !== 2 && (
          <span className="hidden md:block bg-gray-300 w-px h-3/5 group-hover:hidden"></span>
        )}
        <div
          onClick={() => toggleMenuClick(3)}
          className={classNames(
            menuClicked === 3
              ? "shadow-lg ring-1 ring-black ring-opacity-5 bg-white"
              : "hover:bg-gray-300",
            "hidden md:flex md:w-[17%]  h-full rounded-full flex items-center px-4"
          )}
        >
          <div className="flex flex-col">
            <h4 className="font-semibold">Check out</h4>
            <span className="text-gray-500">Add dates</span>
          </div>
          {((!menuClicked && clickedSearchItem === 2) ||
            menuClicked === 3 ||
            menuClicked === 2) && (
            <DatePicker
              customTop="top-16"
              open={menuClicked === 3 || menuClicked === 2}
              setOpen={() => {}}
            />
          )}
        </div>
        {menuClicked !== 3 && clickedSearchItem !== 3 && (
          <span className="hidden md:block bg-gray-300 w-px h-3/5 group-hover:hidden"></span>
        )}
        <div
          onClick={() => toggleMenuClick(4)}
          className={classNames(
            menuClicked === 4 || (!menuClicked && clickedSearchItem === 3)
              ? "shadow-lg ring-1 ring-black ring-opacity-5 bg-white"
              : "hover:bg-gray-300",
            "md:w-[31%]  h-full rounded-full flex items-center pl-4 pr-1"
          )}
        >
          <div className="hidden md:flex flex-col grow">
            <h4 className="font-semibold">Who</h4>
            <span className="text-gray-500">Add guests</span>
          </div>
          <button
            onClick={handleSearch}
            className="flex bg-rose-500 rounded-full py-2 md:px-4 px-2 max-[950px]:px-3 max-[769px]:px-2 gap-2 md:h-10 h-7 justify-center items-center mr-2 text-white"
          >
            <MagnifyingGlassIcon
              className="block md:h-5 md:w-5 h-4 h-4 stroke-3"
              aria-hidden="true"
            />
            <span className="max-[950px]:hidden font-medium text-base">
              Search
            </span>
          </button>
        </div>
        {(menuClicked === 4 || (!menuClicked && clickedSearchItem === 3)) && (
          <NumberOfGuests customTop="top-16" handleClose={handleClickOutside} />
        )}
      </div>
    </ClickOutside>
  );
};

export default LargeSearch;
