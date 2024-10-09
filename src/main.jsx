import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Inscription  from './pages/inscription/inscription.jsx';
import Connexion from './pages/connexion/connexion.jsx';
import Dashboard from './pages/Dashboard/dashboard.jsx';
import FileListView from './pages/Files/fileListView.jsx';


    const router = createBrowserRouter([
      {
        path: '/',
        element: <App/>,
      },
      {
        path: '/connexion',
        element: <Connexion/>,
      },
      {
        path: '/Dashboard',
        element: <Dashboard/>,
      },
      {
        path: '/inscription',
        element: <Inscription/>,
      },

      {
        path: '/FileListView',
        element: <FileListView/>,
      }
     
    ]);
  
    // return (
     
    // )
  
  

  createRoot(document.getElementById('root')).render(

   
    <StrictMode>
    <RouterProvider router={router}/>
   </StrictMode>,
  )



