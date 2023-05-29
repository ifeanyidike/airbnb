"use client";
import Categories from "@component/app/components/Categories";
import Footer from "@component/app/components/Footer";
import ItemCard from "@component/app/components/ItemCard";
import MainNav from "@component/app/components/MainNav";
import MapView from "@component/app/components/MapView";
import { classNames } from "@component/utils/general";
import { getRoomsByLocation } from "@component/utils/logic";
import { APIDataInfo, MapLocations } from "@component/utils/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";

const SearchPage = () => {
  const [clickedSearchItem, setClickedSearchItem] = useState<null | number>(
    null
  );
  const [data, setRoomData] = useState<APIDataInfo[] | null>();
  const [mapLocations, setMapLocations] = useState<MapLocations[]>([]);
  const router = useRouter();
  const { loc } = router.query;

  useEffect(() => {
    if (!loc || typeof loc !== "string") return;
    const _data = getRoomsByLocation(loc);

    if (!_data) return;
    setRoomData(_data);

    const _mapLocations = _data.map((d) => {
      const loc = d.info.location;
      return {
        lat: loc.lat,
        lng: loc.long,
      };
    });
    setMapLocations(_mapLocations);
  }, [loc]);

  if (data === null) return;

  return (
    <div
      className={classNames(
        clickedSearchItem ? "bg-gray-300" : "",
        "flex h-full flex-col justify-between"
      )}
    >
      <MainNav
        clickedSearchItem={clickedSearchItem}
        setClickedSearchItem={setClickedSearchItem}
      />
      {data?.length ? (
        <>
          <Categories />
          <div className="flex lg:flex-row flex-col px-9 pt-3 pb-7 gap-4">
            <div className="lg:w-3/5 w-full grid md:grid-cols-3 sm:grid-cols-2 max-[420px]:grid-cols-1 gap-3 py-5">
              {data?.map((d: APIDataInfo, index) => (
                <ItemCard
                  hasLike
                  hasRadius
                  customWidth={500}
                  data={d}
                  key={index}
                />
              ))}
            </div>
            {mapLocations.length && (
              <div className="lg:w-2/5 w-full mt-5 h-full sticky top-2">
                <MapView mapLocations={mapLocations} />
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="w-full h-96 text-3xl grid place-items-center">
          The search returned an empty result.
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SearchPage;
