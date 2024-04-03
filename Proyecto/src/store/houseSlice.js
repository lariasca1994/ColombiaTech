import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import houseApi from '../api/houseApi';

export const fetchHouses = createAsyncThunk('houses/fetchHouses', async () => {
  const response = await houseApi.getAll();
  return response;
});

export const createHouse = createAsyncThunk('houses/createHouse', async (newHouse) => {
  const response = await houseApi.create(newHouse);
  return response;
});

export const updateHouse = createAsyncThunk('houses/updateHouse', async ({ id, updatedHouse }) => {
  const response = await houseApi.update(id, updatedHouse);
  return response;
});

export const deleteHouse = createAsyncThunk('houses/deleteHouse', async (id) => {
  const response = await houseApi.remove(id);
  return response;
});

const initialState = {
  houses: [],
  status: 'idle',
  error: null,
};

const houseSlice = createSlice({
  name: 'houses',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchHouses.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchHouses.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.houses = action.payload;
    },
    [fetchHouses.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [createHouse.fulfilled]: (state, action) => {
      state.houses.push(action.payload);
    },
    [updateHouse.fulfilled]: (state, action) => {
      const { id } = action.payload;
      const existingHouse = state.houses.find((house) => house.id === id);
      if (existingHouse) {
        Object.assign(existingHouse, action.payload);
      }
    },
    [deleteHouse.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.houses = state.houses.filter((house) => house.id !== id);
    },
  },
});

export const selectAllHouses = (state) => state.houses.houses;
export const selectHouseById = (state, houseId) => state.houses.houses.find((house) => house.id === houseId);
export const selectHousesStatus = (state) => state.houses.status;
export const selectHousesError = (state) => state.houses.error;

export default houseSlice.reducer;