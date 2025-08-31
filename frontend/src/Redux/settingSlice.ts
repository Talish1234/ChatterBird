import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface settingType {
darkMode: boolean;
notification: boolean;
};

const initialState = {
  setting: localStorage.getItem("chatter-setting")
    ? JSON.parse(localStorage.getItem("chatter-setting") as string)
    : {
        darkMode:false,
        notification:true
    },
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    changeSetting : (state, action) => {
      state.setting = action.payload;
      localStorage.setItem("chatter-setting", JSON.stringify(action.payload));
    }
  },
});

export const { changeSetting } = settingSlice.actions;
export const settingReducer = settingSlice.reducer;

