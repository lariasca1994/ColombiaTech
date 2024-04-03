import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import userApi from '../api/userApi';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await userApi.getAll();
  return response;
});

export const createUser = createAsyncThunk('users/createUser', async (newUser) => {
  const response = await userApi.create(newUser);
  return response;
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, updatedUser }) => {
  const response = await userApi.update(id, updatedUser);
  return response;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  const response = await userApi.remove(id);
  return response;
});

const initialState = {
  users: [],
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.users = action.payload;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
    [createUser.fulfilled]: (state, action) => {
      state.users.push(action.payload);
    },
    [updateUser.fulfilled]: (state, action) => {
      const { id } = action.payload;
      const existingUser = state.users.find((user) => user.id === id);
      if (existingUser) {
        Object.assign(existingUser, action.payload);
      }
    },
    [deleteUser.fulfilled]: (state, action) => {
      const { id } = action.payload;
      state.users = state.users.filter((user) => user.id !== id);
    },
  },
});

export const selectAllUsers = (state) => state.users.users;
export const selectUserById = (state, userId) => state.users.users.find((user) => user.id === userId);
export const selectUsersStatus = (state) => state.users.status;
export const selectUsersError = (state) => state.users.error;

export default userSlice.reducer;