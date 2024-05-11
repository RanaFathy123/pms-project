import './App.css'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./Modules/SharedModules/components/AuthLayout/AuthLayout";
import NotFound from "./Modules/SharedModules/components/NotFound/NotFound";
import Login from "./Modules/AuthModule/components/Login/Login";
import Register from "./Modules/AuthModule/components/Register/Register";
import ForgetPassword from "./Modules/AuthModule/components/ForgetPassword/ForgetPassword";
import ResetPassword from "./Modules/AuthModule/components/ResetPassword/ResetPassword";
import VerifyAccount from "./Modules/AuthModule/components/VerifyAccount/VerifyAccount";
import ChangePassword from "./Modules/AuthModule/components/ChangePassword/ChangePassword";
import MasterLayout from "./Modules/SharedModules/components/MasterLayout/MasterLayout";
import Dashboard from "./Modules/DashboardModule/components/Dashboard/Dashboard";
import UsersList from "./Modules/UsersModule/components/UsersList/UsersList";
import TasksList from "./Modules/TasksModule/components/TasksList/TasksList";
import ProjectList from "./Modules/ProjectModule/components/ProjectList/ProjectList";
import TasksData from "./Modules/TasksModule/components/TasksData/TasksData";
import ProjectData from "./Modules/ProjectModule/components/ProjectData/ProjectData";

const App = () => {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forgetpass", element: <ForgetPassword /> },
        { path: "resetpass", element: <ResetPassword /> },
        { path: "verifyaccount", element: <VerifyAccount /> },
        { path: "changepassword", element: <ChangePassword /> },
        { path: "*", element: <NotFound /> },
      ],
    },
    {
      path: "/dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "users", element: <UsersList /> },
        { path: "tasks", element: <TasksList /> },
        { path: "taskdata", element: <TasksData /> },
        { path: "projects", element: <ProjectList /> },
        { path: "projectdata", element: <ProjectData /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  );
};

export default App;
