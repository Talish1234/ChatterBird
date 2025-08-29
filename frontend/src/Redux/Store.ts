import { configureStore } from '@reduxjs/toolkit';
import {selectedUserReducer} from './selectedUserSlices'; 
import { authUserReducer } from './authSlice';
import { notificationStackReducer } from './notificationStackSlice';
// Import the reducer

const store = configureStore({
  reducer: {
    selectedUser: selectedUserReducer,
    authUser: authUserReducer,
    notificationStack: notificationStackReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
