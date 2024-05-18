import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.tsx";
import ProjectContextProvider from "./context/ProjectContext.tsx";
import UsersContextProvider from "./context/UsersContext.tsx";
import AllUsersContextProvider from "./context/AllUsersContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProjectContextProvider>
        <UsersContextProvider>
          <AllUsersContextProvider>
            <App />
          </AllUsersContextProvider>
        </UsersContextProvider>
      </ProjectContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
