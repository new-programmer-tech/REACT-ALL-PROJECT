/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create action
export const createUser = createAsyncThunk(
  'createUser',
  async (data, { rejectWithValue }) => {
    console.log('createUser called');
    try {
      const response = await fetch(
        'https://668d679a099db4c579f2db14.mockapi.io/crud',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//read action

export const showUser = createAsyncThunk(
  'showUser',
  async (_, { rejectWithValue }) => {
    console.log('showUser called');
    try {
      const response = await fetch(
        'https://668d679a099db4c579f2db14.mockapi.io/crud'
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//delete action
export const deleteUser = createAsyncThunk(
  'deleteUser',
  async (id, { rejectWithValue }) => {
    console.log("delete id ",id);

    try {
      const response = await fetch(
        `https://668d679a099db4c579f2db14.mockapi.io/crud/${id}`,
        {
          method:'DELETE'
        }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// =============================================================================

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const userDetail = createSlice({
  name: 'userDetail',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(showUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    builder
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);

        const {id} = action.payload;

        if (id) {
          state.users = state.users.filter((ele) => ele.id !== id);
        }
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userDetail.reducer;
