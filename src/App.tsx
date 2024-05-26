import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ChangePassword from "./Modules/AuthModule/components/ChangePassword/ChangePassword";
import ForgetPassword from "./Modules/AuthModule/components/ForgetPassword/ForgetPassword";
import Login from "./Modules/AuthModule/components/Login/Login";
import Register from "./Modules/AuthModule/components/Register/Register";
import ResetPassword from "./Modules/AuthModule/components/ResetPassword/ResetPassword";
import VerifyAccount from "./Modules/AuthModule/components/VerifyAccount/VerifyAccount";
import Dashboard from "./Modules/DashboardModule/components/Dashboard/Dashboard";
import ProjectData from "./Modules/ProjectModule/components/ProjectData/ProjectData";
import ProjectList from "./Modules/ProjectModule/components/ProjectList/ProjectList";
import AuthLayout from "./Modules/SharedModules/components/AuthLayout/AuthLayout";
import MasterLayout from "./Modules/SharedModules/components/MasterLayout/MasterLayout";
import NotFound from "./Modules/SharedModules/components/NotFound/NotFound";
import TasksData from "./Modules/TasksModule/components/TasksData/TasksData";
import TasksList from "./Modules/TasksModule/components/TasksList/TasksList";
import UsersList from "./Modules/UsersModule/components/UsersList/UsersList";

import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./Modules/SharedModules/components/PrivateRoute/PrivateRoute";
import ProtectedRoute from "./Modules/SharedModules/components/ProtectedRoute/ProtectedRoute";
import TasksBoard from "./Modules/TasksModule/components/TasksBoard/TasksBoard";
import { AuthContext } from "./context/AuthContext";
import { useContext } from "react";

const App = () => {
  const { loginData } = useContext(AuthContext);

  const routes = createBrowserRouter([
    {
      path: "/",

      element: (
        <PrivateRoute>
          <AuthLayout />
        </PrivateRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-pass", element: <ForgetPassword /> },
        { path: "reset-pass", element: <ResetPassword /> },
        { path: "verify-account", element: <VerifyAccount /> },
        { path: "change-password", element: <ChangePassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "users", element: <UsersList /> },
        {
          path: "tasks",
          element:
            loginData?.userGroup == "Manager" ? <TasksList /> : <TasksBoard />,
        },
        {
          path: "task-data",
          element: <TasksData />,
        },
        { path: "edit-task-data/:id", element: <TasksData /> },
        { path: "projects", element: <ProjectList /> },
        { path: "project-data", element: <ProjectData /> },
        { path: "project-data/:id", element: <ProjectData /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <div>
      <ToastContainer />
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
