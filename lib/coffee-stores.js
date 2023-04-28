import { createApi } from "unsplash-js";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const getCoffeeStoreURLs = (query, latLong, limit) =>
  `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;

const getCoffeeStoreImages = async () => {
  const photos = await unsplash.search.getPhotos({
    query: "coffee shop",
    perPage: 30,
  });
  const unsplashResults = photos.response.results;
  return unsplashResults.map((result) => result.urls["full"]);
};

export const fetchCoffeeStores = async () => {
  const photos = await getCoffeeStoreImages();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: process.env.FOURSQUARE_API_KEY,
    },
  };

  const response = await fetch(
    getCoffeeStoreURLs("coffee", "36.8169681%2C-76.1348627", 6),
    options
  );

  const data = await response.json();

  return data.results.map((result, index) => {
    return {
      id: result.fsq_id,
      shopName: result.name,
      address: result.location.address,
      city: result.location.locality,
      imgURL: photos.length > 0 ? photos[index] : null,
    };
  });
  // .catch((err) => console.error(err));
};
