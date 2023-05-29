"use client";
import MainNav from "./components/MainNav";
import { useState } from "react";
import { classNames } from "@component/utils/general";
import Categories from "./components/Categories";
import { getAllData } from "@component/utils/logic";
import { APIDataInfo } from "@component/utils/types";
import ItemCard from "./components/ItemCard";
import Footer from "./components/Footer";

export default function Home() {
  const [clickedSearchItem, setClickedSearchItem] = useState<null | number>(
    null
  );
  const data: APIDataInfo[] = getAllData();
  return (
    <main
      className={classNames(
        clickedSearchItem ? "bg-gray-300" : "",
        "flex h-full flex-col items-center justify-between px-6"
      )}
    >
      <MainNav
        clickedSearchItem={clickedSearchItem}
        setClickedSearchItem={setClickedSearchItem}
      />
      <Categories />

      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 py-8">
        {data.map((d: APIDataInfo, index) => (
          <ItemCard hasLike={true} hasRadius={true} data={d} key={index} />
        ))}
      </div>

      <Footer />
    </main>
  );
}
