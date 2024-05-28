import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import SideBar from "../SideBar/SideBar";

export default function MasterLayout() {
  return (
    <>
      <div className="min-vh-100 d-flex flex-column">
        <NavBar />
        <div className="container-fluid p-0 flex-grow-1">
          <div className="d-flex ">
            <div className="min-vh-100 h-100">
              <SideBar />
            </div>
            <div className="w-100 vh-100 ">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
