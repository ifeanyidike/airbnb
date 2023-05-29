"use client";
import type { APIDataInfo } from "@component/utils/types";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import React, { useState } from "react";

type Image = {
  info: APIDataInfo;
  customWidth?: number;
  hasRadius?: boolean;
};
const PagedImages = ({ info, customWidth, hasRadius }: Image) => {
  const [imageIndex, setImageIndex] = useState(0);

  const handleMoveImagesLeft = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (imageIndex <= 0) return;
    setImageIndex(imageIndex - 1);
  };

  const handleMoveImagesRight = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (imageIndex >= info.images.data.length - 1) return;
    setImageIndex(imageIndex + 1);
  };

  const isImageRounded = () => {
    if (hasRadius) return "rounded-2xl";
    if (!customWidth) return "w-full";

    return "rounded-2xl";
  };
  return (
    <div className="relative group">
      {imageIndex > 0 && (
        <button
          onClick={handleMoveImagesLeft}
          className="absolute left-3 top-1/2 bg-white p-2 rounded-full hidden group-hover:block"
        >
          <ChevronLeftIcon
            className="block h-4 w-4 stroke-3"
            aria-hidden="true"
          />
        </button>
      )}
      <Image
        src={
          info.images.data.length
            ? info.images.data[imageIndex].url
            : info.mainImage.url
        }
        width={customWidth || 350}
        height={customWidth || 350}
        alt={info.title}
        className={isImageRounded()}
      />

      {imageIndex <= info.images.data.length - 1 && (
        <button
          onClick={handleMoveImagesRight}
          className="absolute right-3 top-1/2 bg-white p-2 rounded-full hidden group-hover:block"
        >
          <ChevronRightIcon
            className="block h-4 w-4 stroke-3"
            aria-hidden="true"
          />
        </button>
      )}
    </div>
  );
};

export default PagedImages;
