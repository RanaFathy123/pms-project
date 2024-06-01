import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";
import { useState } from "react";

export default function MasterLayout() {
  const [isCollapsed, setIsCollapse] = useState<boolean>(false);

  return (
    <>
      <div className="min-vh-100 d-flex flex-column">
        <NavBar />
        <div className="container-fluid p-0 flex-grow-1 mt-5">
          <div className="d-flex ">
            <div className="min-vh-100 h-100 z-3 mt-5">
              <SideBar
                isCollapsed={isCollapsed}
                setIsCollapse={setIsCollapse}
              />
            </div>
            <div
              className={
                isCollapsed
                  ? "w-100 px-0 mt-5 left-side"
                  : "w-100  left-side-not-collapsed mt-5"
              }
            >
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
