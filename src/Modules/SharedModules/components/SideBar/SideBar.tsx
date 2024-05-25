// import { useNavigate } from 'react-router-dom'

// export default function SideBar() {
//   const navigate=useNavigate()

//   const Logout=()=>{
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   return <>
//   <div>Sidebar</div>
//     <button className='mt-2 btn btn-success' type='button'  onClick={Logout} >
//       <i className="fa-solid fa-right-from-bracket"></i>
//        LogOut 
//        </button>

//   </>
// }

// eslint-disable-next-line no-unused-vars
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
// import Modal from 'react-bootstrap/Modal';
// import toggler from '../../../../assets/img/3.png';
import './SideBar.css'
import ChangePassword from '../../../AuthModule/components/ChangePassword/ChangePassword';

export default function SideBar() {

  const [isCollapsed,setIsCollapse]=useState(false)
  const toggleCollapsed=()=>{
    setIsCollapse(!isCollapsed);
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate=useNavigate()
  // Logout
  const Logout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
  };


   
  return <>

      {/* <Modal show={show} onHide={handleClose}>
        <Modal.Body className='background-pass'>
          <ChangePassword />
        </Modal.Body>
      </Modal> */}
 
      <div className=' sidebar-container'>
        <Sidebar collapsed={isCollapsed}>
  <Menu >
        <MenuItem className=' text-end ' onClick={toggleCollapsed}  >
          {isCollapsed?<i className="fa-solid fa-chevron-right p-2  fa-s position-absolute end-0 container-chevron"></i>:
          <i className="fa-solid fa-chevron-left p-2 fa-s position-absolute end-0 container-chevron"></i>
        }
            </MenuItem>

    <MenuItem icon={<i className="fa-solid fa-house"></i>} component={<Link to="/dashboard" />} className='pt-5' > Home </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-users"></i>} component={<Link to="/dashboard/users" />}> Users </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-table-cells-large"></i>} component={<Link to="/dashboard/projects" />}> Projects </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-list-check"></i>} component={<Link to="/dashboard/tasks" />}> Tasks </MenuItem>
    <MenuItem onClick={handleShow}  icon={<i className="fa-solid fa-lock-open"></i>}> Change Password </MenuItem>
    <MenuItem icon={<i className="fa-solid fa-right-from-bracket"></i>} onClick={Logout} > LogOut </MenuItem>

  </Menu>
</Sidebar>
</div>
  </>
}