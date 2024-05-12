import { Link } from "react-router-dom";
import avatar from '../../../../assets/images/avatar.png';
import navlogo from '../../../../assets/images/nav-logo.png';

export default function NavBar() {
  return<>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="">
      <img src={navlogo} alt=""/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
    
        <ul  className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link " to=''>
        <i className="fa-solid fa-bell pt-2 ps-3  text-warning fa-2x"></i>            
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to=''>
                <img src={avatar} className=" pe-2 rounded rounded-circle" alt=""/>
          </Link>
        </li>

        </ul>
    </div>
  </div>
</nav>

  </>
}
