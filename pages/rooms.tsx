"use client";
import "tailwindcss/tailwind.css";
import MainNav from "@component/app/components/MainNav";
import { classNames } from "@component/utils/general";
import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/router";
import { APIDataInfo } from "@component/utils/types";
import { getRoomById } from "@component/utils/logic";
import { StarIcon, TrophyIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import Image from "next/image";
import BedIcon from "@component/app/components/Icons/BedIcon";
import BathroomIcon from "@component/app/components/Icons/BathroomIcon";
import HouseIcon from "@component/app/components/Icons/HouseIcon";
import RentalRoom from "@component/app/components/Icons/RentalRoom";
import CheckInIcon from "@component/app/components/Icons/CheckInIcon";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import DoorLockIcon from "@component/app/components/Icons/DoorLockIcon";
import WasherIcon from "@component/app/components/Icons/WasherIcon";
import BalconyIcon from "@component/app/components/Icons/BalconyIcon";
import LuggageIcon from "@component/app/components/Icons/LuggageIcon";
import KitchenIcon from "@component/app/components/Icons/KitchenIcon";
import CarIcon from "@component/app/components/Icons/CarIcon";
import HairDryerIcon from "@component/app/components/Icons/HairDryerIcon";
import FreeDryerIcon from "@component/app/components/Icons/FreeDryerIcon";
import BackyardIcon from "@component/app/components/Icons/BackyardIcon";
import Footer from "@component/app/components/Footer";
import GridIcon from "@component/app/components/Icons/GridIcon";
import { Dialog, Transition } from "@headlessui/react";
import PagedImages from "@component/app/components/PagedImages";
import NumberOfGuests from "@component/app/components/NumberOfGuests";

type Detail = {
  type?: string;
  value?: number;
};
const Rooms = () => {
  let [openModal, setOpenModal] = useState(false);
  const [clickedSearchItem, setClickedSearchItem] = useState<null | number>(
    null
  );
  const [guests, setGuests] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [data, setRoomData] = useState<APIDataInfo>({});

  function getRoomDetail(type: string): Detail {
    if (!data) return {};
    return data?.details?.data?.find((d: Detail) => d.type === type);
  }

  function getSlicedDescription(): string {
    if (data.description.length <= 400) return data.description;
    return data.description.slice(0, 400) + "...";
  }

  useEffect(() => {
    if (!id || typeof id !== "string") return;
    const _data = getRoomById(id);
    if (!_data) return;
    setRoomData(_data.info);
  }, [id]);
  if (!Object.values(data).length) return;

  return (
    <div
      className={classNames(
        clickedSearchItem ? "bg-gray-300" : "",
        "flex h-full flex-col justify-between"
      )}
    >
      <MainNav
        customPx="lg:px-40 px-7"
        clickedSearchItem={clickedSearchItem}
        setClickedSearchItem={setClickedSearchItem}
      />
      <div className="lg:mx-40 mx-7">
        <h2 className="font-medium text-2xl">{data.title}</h2>
        <div className="flex items-center text-sm pt-2">
          <div className="flex max-[420px]:flex-col md:flex-row min-[420px]:gap-3 md:items-center">
            <p className="flex items-start gap-1">
              <StarIcon className="block h-4 w-4" aria-hidden="true" />
              <span>{data.ratings.guestSatisfactionOverall}</span>
            </p>
            <span>.</span>
            <Link className="underline" href="#">
              {data.visibleReviewCount} reviews
            </Link>
            <span>.</span>
            {data.host.isSuperhost && (
              <>
                <p className="flex items-center gap-2">
                  <TrophyIcon className="block h-3 w-3" aria-hidden="true" />
                  <span> Superhost</span>
                </p>
                <span>.</span>
              </>
            )}
            <Link className="underline" href="#">
              {data.location.city}, {data.location.country.title}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex lg:mx-40 mx-7 gap-2 mt-7 hidden md:flex">
        <div className="flex">
          <Image
            src={data.mainImage.url}
            width={400}
            height={400}
            alt={data.title}
            className="rounded-s-2xl object-cover grow-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 ">
          {data.images.data.slice(1, 5).map((d: any, index: number) => (
            <div key={index} className="relative">
              <Image
                src={d.url}
                width={200}
                height={200}
                alt={data.title}
                className={`object-cover h-full ${
                  index === 1
                    ? "rounded-tr-2xl"
                    : index === 3
                    ? "rounded-br-2xl"
                    : ""
                }`}
              />
              {index === 3 ? (
                <button
                  onClick={() => setOpenModal(true)}
                  className="flex gap-2 justify-center items-center bg-white absolute rounded-xl md:px-4 md:py-2 px-2 py-1 md:bottom-3 md:right-3 bottom-1 right-1 "
                >
                  <div className="hidden md:block">
                    <GridIcon />{" "}
                  </div>
                  <span className="md:text-base text-xs">Show all photos</span>
                </button>
              ) : null}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center md:hidden pt-7">
        <PagedImages info={data} customWidth={500} />
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between lg:mx-40 mx-7 mt-10 mb-20  gap-5">
        <div className="md:w-3/5 w-full">
          <span className="flex justify-between items-center">
            <h3 className="text-2xl">
              Room in a rental unit hosted by {data.host.name}
            </h3>
            <Image
              src={data.host.avatar.url}
              width={36}
              height={36}
              alt={data.host.name}
              className="rounded-full"
            />
          </span>
          <div className="flex max-[420px]:flex-col flex-row justify-between gap-3 py-5 text-xs">
            <div className="flex flex-col gap-2 border border-solid border-gray-200 shadow ring-1 ring-gray-600 ring-opacity-5 p-5 rounded-3xl grow ">
              <BedIcon />
              <span>{getRoomDetail("beds")?.value} double bed</span>
            </div>
            <div className="flex flex-col gap-2 border border-solid border-gray-200 shadow ring-1 ring-gray-600 ring-opacity-5 p-5 rounded-3xl grow">
              <BathroomIcon />
              <span>Dedicated bathroom</span>
            </div>
            <div className="flex flex-col gap-2 border border-solid border-gray-200 shadow ring-1 ring-gray-600 ring-opacity-5 p-5 rounded-3xl grow">
              <HouseIcon />
              <span>Host lives here</span>
            </div>
          </div>
          <hr />
          <div className="py-5 flex flex-col gap-7">
            <div className="flex gap-4 items-start">
              <RentalRoom />
              <div className="flex flex-col gap-2">
                <h4 className="font-medium text-base">Room in a rental unit</h4>
                <p className="text-gray-400 text-sm">
                  Your own room in a home, plus access to shared spaces.
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <CheckInIcon />
              <div className="flex flex-col gap-2">
                <h4 className="font-medium text-base">Self check-in</h4>
                <p className="text-gray-400 text-sm">
                  Check yourself in with the lockbox
                </p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <RentalRoom />
              <div className="flex flex-col gap-2">
                <h4 className="font-medium text-base">
                  Free cancellation for 48 hours.
                </h4>
              </div>
            </div>
          </div>

          <div className="mt-5 mb-7 flex flex-col">
            <h4 className="text-2xl mb-3 ">About this place</h4>
            <p className="text-base font-light">{getSlicedDescription()}</p>
          </div>

          <div className="mt-5 mb-10 flex flex-col">
            <h4 className="text-2xl mb-5 ">What this place offers</h4>
            <div className="grid md:grid-cols-2 mb-10 gap-4">
              <p className="flex font-light gap-2">
                <DoorLockIcon /> <span>Lock on bedroom door</span>
              </p>
              <p className="flex font-light gap-2">
                <WifiIcon
                  className="block h-5 w-5 stroke-2"
                  aria-hidden="true"
                />{" "}
                <span>Wifi - 33 Mbps</span>
              </p>
              <p className="flex font-light gap-2">
                <WasherIcon /> <span>Free washer - In unit</span>
              </p>
              <p className="flex font-light gap-2">
                <BalconyIcon /> <span>Private patio or balcony</span>
              </p>
              <p className="flex font-light gap-2">
                <LuggageIcon /> <span>Luggage dropoff allowed</span>
              </p>
              <p className="flex font-light gap-2">
                <KitchenIcon /> <span>Kitchen</span>
              </p>
              <p className="flex font-light gap-2">
                <CarIcon /> <span>Free street parking</span>
              </p>
              <p className="flex font-light gap-2">
                <FreeDryerIcon /> <span>Free dryer - In unit</span>
              </p>
              <p className="flex font-light gap-2">
                <BackyardIcon />{" "}
                <span>Private backyard - Not fully fenced</span>
              </p>
              <p className="flex font-light gap-2">
                <HairDryerIcon /> <span>Hair dryer</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative bg-white mb-5 md:w-96 w-full sticky top-32 rounded-3xl h-fit p-5 shadow-lg ring-1 ring-gray-600 ring-opacity-5">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-2xl font-bold">${data.price}</span> night
            </div>
            <div className="flex gap-2 items-start text-sm">
              <p className="flex items-center gap-2">
                <StarIcon className="block h-4 w-4" aria-hidden="true" />
                <span>{data.ratings.guestSatisfactionOverall}</span>
              </p>
              <span>.</span>
              <Link className="border-b border-solid border-black" href="#">
                {data.visibleReviewCount} reviews
              </Link>
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-full border border-solid border-r-0 border-gray-400 mt-4 h-14 rounded-tl-2xl flex flex-col text-xs items-center justify-center">
              <span className="font-bold">CHECK IN</span>
              <span>9/28/2023</span>
            </div>
            <div className="w-full border border-solid border-gray-400 mt-4 h-14 rounded-tr-2xl flex flex-col text-xs items-center justify-center">
              <span className="font-bold">CHECK OUT</span>
              <span>9/28/2023</span>
            </div>
          </div>
          <div className="w-full border border-solid border-t-0 border-gray-400 text-xs rounded-b-2xl">
            <button
              onClick={() => setOpen(!open)}
              className="flex justify-between items-center w-full p-2"
            >
              <div className="flex flex-col">
                <span className="font-bold self-start">GUESTS</span>
                <span className="text-sm">
                  {guests.adults + guests.children} guest
                  {guests.adults + guests.children > 1 ? "s" : ""}{" "}
                  {guests.infants ? `${guests.infants} infant` : null}
                  {guests.infants > 1 ? "s" : ""}
                </span>
              </div>
              {open ? (
                <ChevronUpIcon
                  className="block h-4 w-4 stroke-3"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDownIcon
                  className="block h-4 w-4 stroke-3"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>
          <button className="mt-5 rounded-xl w-full py-3 bg-rose-500 font-medium text-base text-white">
            Check availability
          </button>
          {open && <NumberOfGuests handleClose={() => setOpen(false)} />}
        </div>
      </div>

      <Transition appear show={openModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20"
          onClose={() => setOpenModal(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="md:w-[80%] w-full transform overflow-hidden rounded-md bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <div className="mt-2 grid gap-5">
                    {data.images.data.map((d: any, index: number) => (
                      <div key={index}>
                        <Image
                          src={d.url}
                          width={500}
                          height={500}
                          alt={data.title}
                          className="object-cover w-full"
                        />
                      </div>
                    ))}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Footer />
    </div>
  );
};

export default Rooms;
