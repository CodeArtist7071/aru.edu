import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
    getChaptersByExamID,
  getExamSubjects,
} from "../services/examService";

export const fetchExamSubjects = createAsyncThunk(
  "examSubjects/fetchExamSubjects",
  async (eid: string, thunkAPI) => {
    try {
      const data = await getExamSubjects(eid);
      const e_data = await getChaptersByExamID(eid);
      return { data, e_data };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

interface examState {
  data: any | null | any[];
  error: string | null;
  loading: boolean;
  e_data: any | null | any[];
}

const initialState: examState = {
  loading: false,
  error: null,
  data: [],
  e_data:[]
};

export const examSubjectSlice = createSlice({
  name: "examSubjects",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchExamSubjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExamSubjects.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.e_data = action.payload.e_data;
      })
      .addCase(fetchExamSubjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default examSubjectSlice.reducer;
