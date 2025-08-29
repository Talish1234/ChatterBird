import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { notificationStack } from "../Interfaces/interface";

const initialState: notificationStack[] = [];
const notificationStackSlice = createSlice({
  name: "notificationStack",
  initialState,
  reducers: {
    pushNotification: (state, action: PayloadAction<notificationStack>) => {
      if (action.payload) {
        const existingNotification = state.find(
          (notification) => notification.userId === action.payload.userId
        );
        if (existingNotification) {
          existingNotification.count += action.payload.count;
          if (action.payload.count > 0) {
            existingNotification.createdAt = new Date().toISOString();
          }
        } else {
          state.push({ userId: action.payload.userId, count: action.payload.count, createdAt: new Date().toISOString() });
        }
      }
    },
    popNotification: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((notification) => notification.userId === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { pushNotification, popNotification } = notificationStackSlice.actions;
export const notificationStackReducer = notificationStackSlice.reducer;
