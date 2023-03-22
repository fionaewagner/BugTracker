import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../Controllers/Redux/authSlice';
import { bugsReducer } from '../Controllers/Redux/bugsSlice';

export const store = configureStore({
  reducer: {
    bugs: bugsReducer,
    auth: authReducer
  },
});
