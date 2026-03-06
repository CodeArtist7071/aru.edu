import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getChapters} from "../services/examService";

export const fetchChapter = createAsyncThunk(
  "chapters/fetchChapters",
  async (subject_id: string, thinkAPI) => {
    try {
      const data = await getChapters(subject_id);
      return data;
    } catch (error: any) {
      return thinkAPI.rejectWithValue(error.message);
    }
  },
);


interface ChapterState {
  loading: boolean;
  error: string | null;
  data: any[];
  ids:any[]
}

const initialState: ChapterState = {
  loading: false,
  error: null,
  data: [],
  ids:[],
};
export const chapterSlice = createSlice({
  name: "chapters",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchChapter.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchChapter.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default chapterSlice.reducer;
