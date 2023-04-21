import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from '../Controllers/Redux/authSlice';
import { bugsReducer } from '../Controllers/Redux/bugsSlice';
import { loadingReducer } from '../Controllers/Redux/loadingSlice';

export const store = configureStore({
  reducer: {
    bugs: bugsReducer,
    auth: authReducer,
    loading: loadingReducer
  },
});
