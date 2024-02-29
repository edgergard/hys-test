import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  units: 'metric',
  sign: '°C',
};

const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    switchToFahrenheit: state => {
      state.units = 'imperial';
      state.sign = '°F';
    },
    switchToCelsium: state => {
      state.units = 'metric';
      state.sign = '°C';
    },
  },
});

export const {switchToFahrenheit, switchToCelsium} = unitsSlice.actions;

export default unitsSlice.reducer;
