import { configureStore } from '@reduxjs/toolkit';
import {selectedUserReducer} from './selectedUserSlices'; 
import { authUserReducer } from './authSlice';
// Import the reducer

const store = configureStore({
  reducer: {
    selectedUser: selectedUserReducer,
    authUser: authUserReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
