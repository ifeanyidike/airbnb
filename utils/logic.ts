import api from "./data";
const data = api[0].data;

export const getAllCategories = () => api[0].categories;
export const getAllData = () => data;

export const getLocationByCity = (value: string) => {
  return data.filter((d) =>
    d.info.location.city.toLowerCase().includes(value.toLowerCase())
  );
};

export const getMatchingLocations = (value: string) => {
  const data = getLocationByCity(value);
  const cities = data.map((d) => d.info.location);
  return cities;
};

export const getMatchingCities = (value: string) => {
  const data = getLocationByCity(value);
  const cities = data.map((d) => {
    const location = d.info.location;
    return `${location.city}, ${location.country.title}`;
  });
  return cities;
};

export const getMatchingTopFiveCities = (value: string) => {
  const data = getMatchingCities(value);
  const uniqueData = [...new Set(data)];

  if (uniqueData.length <= 5) return uniqueData;

  return data.splice(0, 5);
};

export const getRoomById = (id: string) => {
  return data.find((d) => d.info.id === id);
};

export const getRoomsByLocation = (loc: string) => {
  const [city, country] = loc.split(", ");
  const room = data.filter((d) => {
    const location = d.info.location;
    if (!country && city) {
      return location.city.includes(city);
    }
    if (country && city) {
      return (
        location.city.includes(city) && location.country.title.includes(country)
      );
    }
    return [];
  });
  return room;
};
