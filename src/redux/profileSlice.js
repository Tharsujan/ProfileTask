import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching profiles
export const fetchProfiles = createAsyncThunk(
  'profiles/fetchProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://backend.graycorp.io:9000/mymate/api/v1/tempClients"
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch profiles");
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const profileSlice = createSlice({
  name: 'profiles',
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default profileSlice.reducer;