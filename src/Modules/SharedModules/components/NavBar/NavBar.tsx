import { Link } from "react-router-dom";
import avatar from "../../../../assets/images/avatar.png";
import navlogo from "../../../../assets/images/nav-logo.png";
import { AuthContext } from "../../../../context/AuthContext";
import { useContext } from "react";

export default function NavBar() {
  const { loginData } = useContext(AuthContext);
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="">
            <img src={navlogo} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
              </li>
              <li className="nav-item">
                <div className="d-flex align-items-center">
                <i className="fa-solid fa-bell pt-2 ps-3  text-warning fa-2x mx-3 "></i>

                  <div>
                    <img
                      src={avatar}
                      className=" rounded rounded-circle"
                      alt=""
                    />
                  </div>
                  <div className="d-flex flex-column mx-3">
                    <span>{loginData?.userName}</span>
                    <span className="text-muted">{loginData?.userEmail}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
