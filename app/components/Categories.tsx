import { getAllCategories } from "@component/utils/logic";
import { categoriesIcons } from "@component/utils/data";
import React from "react";
import Image from "next/image";

const Categories = () => {
  const categories = getAllCategories();
  const icons: any = categoriesIcons;
  return (
    <div className="overflow-x-auto w-[92%] flex h-14 mx-auto gap-6">
      {categories.map((c) => {
        const img: string = icons[c.type];
        return (
          <button
            key={c.id}
            className="flex-shrink-0 flex flex-col justify-between items-center gap-2 text-slate-400"
          >
            <Image width={25} height={25} src={img} alt={c.title} />
            <p className="text-xs">{c.title}</p>
          </button>
        );
      })}
    </div>
  );
};

export default Categories;
