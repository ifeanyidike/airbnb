import React, { useState } from "react";
import ClickOutside from "./ClickOutside";
import { MinusCircleIcon, PlusCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  handleClose: () => void;
  customTop?: string;
};
const NumberOfGuests = ({ customTop, handleClose }: Props) => {
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });

  return (
    <ClickOutside handleClick={handleClose}>
      <div
        className={`absolute z-20 bg-white max-[420px]:left-0 left-5 ${
          customTop || "top-[180px]"
        } rounded-xl h-fit p-5 shadow-lg ring-1 ring-gray-600 ring-opacity-5 max-[420px]:w-full w-[90%]`}
      >
        <div className="flex justify-between mb-9">
          <div className="flex flex-col">
            <h5 className="font-medium">Adults</h5>
            <small className="text-xs">Age 13+</small>
          </div>

          <div className="flex items-center gap-3">
            {" "}
            <PlusCircleIcon
              onClick={() => {
                setGuests({ ...guests, adults: guests.adults + 1 });
              }}
              className="block h-9 w-9 stroke-1 stroke-gray-400 hover:stroke-black cursor-pointer"
              aria-hidden="true"
            />{" "}
            <span className="text-sm">{guests.adults}</span>{" "}
            <MinusCircleIcon
              onClick={() => {
                if (guests.adults > 0)
                  setGuests({ ...guests, adults: guests.adults - 1 });
              }}
              className="block h-9 w-9 stroke-1 stroke-gray-400 hover:stroke-black cursor-pointer"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="flex justify-between mb-9">
          <div className="flex flex-col">
            <h5 className="font-medium">Children</h5>
            <small className="text-xs">Ages 2-12</small>
          </div>

          <div className="flex items-center gap-3">
            {" "}
            <PlusCircleIcon
              onClick={() => {
                setGuests({ ...guests, children: guests.children + 1 });
              }}
              className="block h-9 w-9 stroke-1 stroke-gray-400 hover:stroke-black cursor-pointer"
              aria-hidden="true"
            />{" "}
            <span className="text-sm">{guests.children}</span>{" "}
            <MinusCircleIcon
              onClick={() => {
                if (guests.children > 0)
                  setGuests({
                    ...guests,
                    children: guests.children - 1,
                  });
              }}
              className="block h-9 w-9 stroke-1 stroke-gray-400 hover:stroke-black cursor-pointer"
              aria-hidden="true"
            />
          </div>
        </div>
        <div className="flex justify-between mb-5">
          <div className="flex flex-col">
            <h5 className="font-medium">Infants</h5>
            <small className="text-xs">Under 2</small>
          </div>

          <div className="flex items-center gap-3">
            {" "}
            <PlusCircleIcon
              onClick={() => {
                setGuests({ ...guests, infants: guests.infants + 1 });
              }}
              className="block h-9 w-9 stroke-1 stroke-gray-400 hover:stroke-black cursor-pointer"
              aria-hidden="true"
            />{" "}
            <span className="text-sm">{guests.infants}</span>{" "}
            <MinusCircleIcon
              onClick={() => {
                if (guests.infants > 0)
                  setGuests({ ...guests, infants: guests.infants - 1 });
              }}
              className="block h-9 w-9 stroke-1 stroke-gray-400 hover:stroke-black cursor-pointer"
              aria-hidden="true"
            />
          </div>
        </div>

        <p className="text-sm text-gray-600">
          This place has a maximum of 2 guests, not including infants. Pets
          aren&lsquo;t allowed.
        </p>
        <div className="flex">
          <button onClick={handleClose} className="underline ml-auto">
            Close
          </button>
        </div>
      </div>
    </ClickOutside>
  );
};

export default NumberOfGuests;
