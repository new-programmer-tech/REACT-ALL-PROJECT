/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify'; // For user notifications

// Create action
export const createUser = createAsyncThunk(
  'userDetail/createUser',
  async (data, { rejectWithValue }) => {
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

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Read action
export const showUser = createAsyncThunk(
  'userDetail/showUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://668d679a099db4c579f2db14.mockapi.io/crud'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Delete action with optimistic update
export const deleteUser = createAsyncThunk(
  'userDetail/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `https://668d679a099db4c579f2db14.mockapi.io/crud/${id}`,
        {
          method: 'DELETE',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const result = await response.json();
      toast.success('User deleted successfully');
      return { id: result.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//update actions
export const updateUser = createAsyncThunk(
  'userDetail/updateUser',
  async (data, { rejectWithValue }) => {
    console.log('updateUser', data);
    try {
      const response = await fetch(
        `https://668d679a099db4c579f2db14.mockapi.io/crud/${data.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      const result = await response.json();
      // toast.success('User deleted successfully');
      return { id: result.id };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//search action

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
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
        toast.success('User created successfully');
      })
      .addCase(createUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(showUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(showUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
        toast.success('Users fetched successfully');
      })
      .addCase(showUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users = state.users.filter((user) => user.id !== action.meta.arg);
        console.log('deleted user slice');
        toast.success('User deleted successfully :)');
        // setTimeout(() => {
        //   toast.success('User deleted successfully ');
        // }, 100);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(`Reverting deletion due to an error: ${action.payload}`);
      })

      //update
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(
          state.users.map((ele) =>
            ele.id === action.payload.id ? action.payload : ele
          )
        );

        toast.success('User Updated successfully');
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export default userDetail.reducer;
