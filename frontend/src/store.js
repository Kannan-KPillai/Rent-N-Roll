import {configureStore, combineReducers} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import { apiSlice } from './slices/apiSlices';
import adminReducer from './adminSlices/adminAuthSlice';
import ownerReducer from './ownerSlices/ownerAuthSlice';



const rootReducer = combineReducers({
    auth: authReducer,
    admin: adminReducer,
    owner: ownerReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  });
  
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
  });
  

export default store;