// store.js
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './features/chatSlice';
import authReducer from './features/authSlice';
import numberReducer from './features/numberSlice';
import usersReducer from './features/userSlice';
import housesReducer from './features/houseSlice';
import { apiSlice } from './features/api/apiSlice';
import { apiHousesSlice } from './features/api/apiHousesSlice';
import { apiColombiaSlice } from './features/api/apiColombiaSlice';
import { apiMessageSlice } from './features/api/apiMessageSlice';
import chatReducer from './features/chatSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    auth: authReducer,
    number: numberReducer,
    users: usersReducer,
    houses: housesReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [apiHousesSlice.reducerPath]: apiHousesSlice.reducer,
    [apiColombiaSlice.reducerPath]: apiColombiaSlice.reducer,
    [apiMessageSlice.reducerPath]: apiMessageSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(apiHousesSlice.middleware)
      .concat(apiMessageSlice.middleware)
      .concat(apiColombiaSlice.middleware),
});

export default store;