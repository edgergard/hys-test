import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getWeatherData} from '../api';
import {SelectedLocation} from '../types';

export const getSelectedLocation = createAsyncThunk(
  'selectedLocation/getSelectedLocation',
  async ({coordinates, units}: {coordinates: number[]; units: string}) => {
    const response = await getWeatherData(
      coordinates[0],
      coordinates[1],
      units,
    );

    return response.data;
  },
);

interface SelectedLocationState {
  selectedLocation: SelectedLocation | null;
  isLoading: boolean;
}

const initialState = {
  selectedLocation: null,
  isLoading: false,
} satisfies SelectedLocationState as SelectedLocationState;

const selectedLocationSlice = createSlice({
  name: 'selectedLocation',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getSelectedLocation.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(getSelectedLocation.fulfilled, (state, action) => {
      state.isLoading = false;
      state.selectedLocation = action.payload;
    });
    builder.addCase(getSelectedLocation.rejected, state => {
      state.isLoading = false;
    });
  },
});

export default selectedLocationSlice.reducer;
