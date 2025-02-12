import {
    createBrowserRouter,
  } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import AdminPanel from "../pages/dashboard/adminPanel/AdminPanel";
import DashBoard from "../outlet/DashBoard";
import AllEmployees from "../pages/dashboard/AllEmployees";
import UpdateEmployee from "../components/UpdateEmployee";
const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children:[
        {
            path:'/',
            element:<Home/>
        },
        {
            path:'/login',
            element:<Login/>
        },
        
      ]
    },
    {
      path:'dashboard',
      element:<DashBoard/>,
      children:[
        {
          path:"dashboard",
          element:<DashBoard/>
        },
        {
          path:'admin',
          element:<AdminPanel/>
        },
        {
          path:'totalEmployees',
          element:<AllEmployees/>
        },
        {
          path:'updateEmployee/:id',
          element:<UpdateEmployee/>
        }
      ]
    }
  ]);
  export default router