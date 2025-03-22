import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import CartPage from "../pages/glasses/CartPage";
import SingleGlass from "../pages/glasses/SingleGlass";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Dashboard from "../pages/dashboard/Dashboard";
import ManageBooks from "../pages/dashboard/manageGlasses/ManageGlasses";
import AddGlass from "../pages/dashboard/addGlass/AddGlass";
import UpdateGlass from "../pages/dashboard/EditGlass/UpdateGlass";
import ManageGlasses from "../pages/dashboard/manageGlasses/ManageGlasses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/orders",
        element: <div>Orders</div>,
      },
      {
        path: "/about",
        element: <div>About</div>,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/glasses/:id",
        element: <SingleGlass />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "add-new-glass",
        element: <AddGlass />,
      },
      {
        path: "edit-glass/:id",
        element: <UpdateGlass />,
      },
      {
        path: "manage-glasses",
        element: <ManageGlasses />,
      },
    ],
  },

  //Unlock when admin part finished
  // {
  //   path:"/admin",
  //   element:<div>Admin Login</div>
  // },
  // {
  //   path: "/dashboard",
  //   element: <AdminRoute><DashboardLayout/></AdminRoute>,
  //   children:[
  //     {
  //       path: "",
  //       element: <AdminRoute><Dashboard/></AdminRoute>
  //     },
  //     {
  //       path: "add-new-glass",
  //       element: <AdminRoute><AddGlass/></AdminRoute>
  //     },
  //     {
  //       path: "edit-glass/:id",
  //       element: <AdminRoute><UpdateGlass/></AdminRoute>
  //     },
  //     {
  //       path: "manage-glasses",
  //       element: <AdminRoute><ManageBooks/></AdminRoute>
  //     }
  //   ]
  // }
]);

export default router;
