import type { APIDataInfo } from "@component/utils/types";
import {
  HeartIcon as HeartIconSolid,
  StarIcon,
} from "@heroicons/react/20/solid";
import React, { useState } from "react";
import PagedImages from "./PagedImages";
import { useRouter } from "next/navigation";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";

interface Props {
  data: {
    info: APIDataInfo;
    category: number;
    ref: string;
  };
  customWidth?: number;
  hasRadius?: boolean;
  hasLike?: boolean;
}
const ItemCard = (props: Props) => {
  const { data, customWidth, hasRadius, hasLike } = props;
  const info = data.info;
  const router = useRouter();
  const [toggleLike, setToggleLike] = useState(false);

  const handleToggleLike = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setToggleLike(!toggleLike);
  };
  return (
    <div
      onClick={() => router.push(`/rooms?id=${info.id}`)}
      className="relative rounded-2xl cursor-pointer"
    >
      {hasLike && (
        <div className="absolute z-10 right-2 top-2" onClick={handleToggleLike}>
          {toggleLike ? (
            <HeartIconSolid
              className="block h-7 w-7 fill-rose-600"
              aria-hidden="true"
            />
          ) : (
            <HeartIconOutline
              className="block h-7 w-7 stroke-white fill-gray-500"
              aria-hidden="true"
            />
          )}
        </div>
      )}
      <PagedImages
        hasRadius={hasRadius}
        customWidth={customWidth}
        info={info}
      />

      <div className="text-sm">
        <p className="text-sm flex justify-between items-center pt-2 pb-1 ">
          <span className="font-medium text-base">
            {info.location.city} {info.location.country.title}
          </span>
          <span className="flex gap-1">
            <StarIcon className="block h-4 w-4 stroke-3" aria-hidden="true" />{" "}
            {info.ratings.guestSatisfactionOverall}{" "}
          </span>
        </p>
        <p>
          <span className="text-base">${info.price}</span> <span>night</span>
        </p>
      </div>
    </div>
  );
};

export default ItemCard;
