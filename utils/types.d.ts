import api from "./data";
import { categoriesIcons } from "./data";
const data = api[0].data;
const categories = api[0].categories;

type APIData = keyof typeof data;
type APIDataTypes = (typeof data)[APIData];

type APICategories = keyof typeof data;
type APICategoriesTypes = (typeof data)[APICategories];

type APIDataInfo = MyData["info"];
type LocationType = MyData["info"]["location"];
type ImageType = MyData["info"]["images"];
type MainImageType = MyData["info"]["mainImage"];

type ClickedSearch = {
  customPx?: string;
  clickedSearchItem: null | number;
  setClickedSearchItem: (e: null | number) => void;
};

type CategoriesIconData = keyof typeof categoriesIcons;
type CategoriesIconTypes = (typeof categoriesIcons)[CategoriesIconData];
type MapLocations = {
  lat: number;
  lng: number;
};

export type {
  APICategoriesTypes,
  APIDataTypes,
  LocationType,
  ClickedSearch,
  CategoriesIconData,
  APIDataInfo,
  ImageType,
  MainImageType,
  MapLocations,
};
