"use client";
import Image from "next/image";
import React from "react";
import NavDropdown from "./NavDropdown";
import { GlobeAltIcon } from "@heroicons/react/24/outline";
import SearchBox from "./SearchBox";
import { classNames } from "@component/utils/general";
import LargeSearch from "./LargeSearch";
import { ClickedSearch } from "@component/utils/types";
import Link from "next/link";

const logoAddr =
  "https://boggy-streetcar-558.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F65ad2e21-3c1a-499a-a5b2-52680a3a65b0%2FHostshare-green.png?id=34cbabc3-ed37-4b68-9bb0-3546d01875a7&table=block&spaceId=f2ea7328-64a4-4f18-bacc-df6c9ac3d888&width=2000&userId=&cache=v2";

const MainNav = (props: ClickedSearch) => {
  const { clickedSearchItem, setClickedSearchItem, customPx } = props;
  return (
    <div
      className={`relative w-screen mt-0 ${
        customPx || "px-8"
      } mb-5 pb-5 bg-white`}
    >
      <div className="flex items-start justify-between w-full bg-white py-5 cursor-pointer">
        <Link className="hidden md:block" href="/">
          <Image src={logoAddr} alt="Hostshare logo" width={150} height={32} />
        </Link>

        <div
          className={classNames(
            clickedSearchItem ? "max-[950px]:hidden" : "",
            "w-96 mx-auto"
          )}
        >
          <SearchBox
            clickedSearchItem={clickedSearchItem}
            setClickedSearchItem={setClickedSearchItem}
          />
        </div>

        <div className="hidden md:flex items-center gap-1">
          <span className="hidden min-[880px]:block hover:bg-[#F7F7F7] p-3 rounded-3xl text-sm">
            Airbnb your home
          </span>
          <div className="p-3 rounded-full hover:bg-[#F7F7F7]">
            <GlobeAltIcon className="block h-5 w-5" aria-hidden="true" />
          </div>
          <NavDropdown />
        </div>
      </div>
      <div
        className={classNames(
          clickedSearchItem ? "min-[950px]:hidden" : "hidden",
          "w-full mx-auto"
        )}
      >
        <SearchBox
          clickedSearchItem={clickedSearchItem}
          setClickedSearchItem={setClickedSearchItem}
        />
      </div>

      <LargeSearch
        clickedSearchItem={clickedSearchItem}
        setClickedSearchItem={setClickedSearchItem}
      />
    </div>
  );
};

export default MainNav;
