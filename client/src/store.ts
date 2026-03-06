import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/userSlice";
import examReducer from "./slice/examSlice";
import examSubjectReducer from "./slice/examSubjectSlice";
import chapterReducer from "./slice/chapterSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    exams: examReducer,
    examSubject: examSubjectReducer,
    chapters: chapterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
