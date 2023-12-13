import { createBrowserRouter } from "react-router-dom";
import Mainlayout from "../Layout/Mainlayout";
import Home from "../Pages/Home/Home";
import Package from "../Pages/Package/Package";
import EmployeeHome from "../Pages/Employee/EmployeeHome/EmployeeHome";
import RequestAsset from "../Pages/Employee/ReqestAsset/RequestAsset";
import MyTeam from "../Pages/Employee/MyTeam/MyTeam";
import MyAsset from "../Pages/Employee/MyAsset/MyAsset";
import CustomRequest from "../Pages/Employee/CustomRequest/CustomRequest";
import Profile from "../Pages/Employee/Profile/Profile";
import AdminHome from "../Pages/Admin/AdminHome/AdminHome";
import MyEmployee from "../Pages/Admin/MyEmployee/MyEmployee";
import AddEmployee from "../Pages/Admin/AddEmployee/AddEmployee";
import AddAsset from "../Pages/Admin/AddAsset/AddAsset";
import AssetList from "../Pages/Admin/AssetList/AssetList";
import AllRequest from "../Pages/Admin/AllRequest/AllRequest";
import AllCustomRequest from "../Pages/Admin/AllCustomRequest/AllCustomRequest";
import Payment from "../Pages/Admin/Payment/Payment";
import AdminProfile from "../Pages/Admin/AdminProfile/AdminProfile";
import EmployeeSignup from "../Pages/Signup/EmployeeSignup";
import HRSignup from "../Pages/Signup/HRSignup";
import Login from "../Pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Support from "../Pages/Employee/Support/Support";

const route = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/packages",
        element: (
          <PrivateRoute>
            <Package />
          </PrivateRoute>
        ),
      },
      //employee routes
      {
        path: "/employee/dashboard",
        element: (
          <PrivateRoute>
            <EmployeeHome />
          </PrivateRoute>
        ),
      },
      {
        path: "/employee/asset-request",
        element: (
          <PrivateRoute>
            <RequestAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "/employee/my-team",
        element: (
          <PrivateRoute>
            <MyTeam />
          </PrivateRoute>
        ),
      },
      {
        path: "/employee/my-assets",
        element: (
          <PrivateRoute>
            <MyAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "/employee/create-custom-request",
        element: (
          <PrivateRoute>
            <CustomRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "/employee/support",
        element: (
          <PrivateRoute>
            <Support />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      //admin routes
      {
        path: "/admin/dashboard",
        element: <AdminHome />,
      },
      {
        path: "/admin/all-employees",
        element: (
          <PrivateRoute>
            <MyEmployee />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/add-employee",
        element: (
          <PrivateRoute>
            <AddEmployee />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/add-asset",
        element: (
          <PrivateRoute>
            <AddAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/asset-list",
        element: (
          <PrivateRoute>
            <AssetList />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/all-asset-request",
        element: (
          <PrivateRoute>
            <AllRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/all-custom-request",
        element: (
          <PrivateRoute>
            <AllCustomRequest />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/payment",
        element: <Payment />,
      },

      {
        path: "/admin/profile",
        element: (
          <PrivateRoute>
            <AdminProfile />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/employee-signup",
    element: <EmployeeSignup />,
  },
  {
    path: "/hr-signup",
    element: <HRSignup></HRSignup>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);

export default route;
