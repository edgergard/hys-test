import axios from 'axios';

const mapboxApiKey =
  'pk.eyJ1IjoiZWRnZXJnYXJkIiwiYSI6ImNsdDc0dmZ1bjBndG8ya3RndXc3aTJsZXAifQ.wGp6uDm41eJiERIUgJg4DQ';

export const getLocations = async (query: string) => {
  const result = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxApiKey}&types=place`,
  );

  return result.data.features;
};
