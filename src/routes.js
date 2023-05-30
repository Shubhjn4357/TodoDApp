import {
    createBrowserRouter,
  } from "react-router-dom";
 import App from './App'; 
 import Dashboard from './component/Dashboard';
export const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:'',
            element:<Dashboard/>
        }
      ]
    },
  ]);