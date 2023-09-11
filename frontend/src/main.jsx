import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.jsx'
import  'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import UserRoutes from './routes/UserRoutes.jsx';
import AdminRoutes from './routes/AdminRoutes.jsx';
import OwnerRoutes from './routes/OwnerRoutes.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>

      <Route index={true} path='/' element={<UserRoutes/>} />
      <Route index={true} path='/*' element={<UserRoutes/>} />

      <Route index={true} path='/admin/*' element={<AdminRoutes/>}/>

      <Route index={true} path='/owner/*' element={<OwnerRoutes/>}/>

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <Provider store={store}>
  <React.StrictMode>
    <RouterProvider router={ router} />
  </React.StrictMode>
  </Provider>
)
