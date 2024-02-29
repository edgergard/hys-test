import {configureStore} from '@reduxjs/toolkit';
import selectedLocationReducer from './features/selectedLocationSlice';
import unitsReducer from './features/unitsSlice';

export const store = configureStore({
  reducer: {
    selectedLocation: selectedLocationReducer,
    units: unitsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
