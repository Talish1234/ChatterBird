import { configureStore } from '@reduxjs/toolkit';
import {selectedUserReducer} from './selectedUserSlices'; 
import { authUserReducer } from './authSlice';
import { notificationStackReducer } from './notificationStackSlice';
import { settingReducer } from './settingSlice';

const store = configureStore({
  reducer: {
    selectedUser: selectedUserReducer,
    authUser: authUserReducer,
    notificationStack: notificationStackReducer,
    setting: settingReducer
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
