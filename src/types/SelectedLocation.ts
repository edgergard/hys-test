export type SelectedLocation = {
  current: Current;
  timezone: string;
  daily: Daily[];
  hourly: Hourly[];
};

type Current = {
  temp: number;
  weather: Weather[];
  feels_like: number;
  humidity: number;
  wind_speed: number;
};

type Daily = {
  temp: {max: number; min: number; day: number};
  id: number;
  dt: number;
  weather: Weather[];
};

type Hourly = {
  dt: number;
  temp: number;
  weather: Weather[];
};

type Weather = {
  main: string;
  icon: string;
};
