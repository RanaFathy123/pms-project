import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'

export default function MasterLayout() {
  return <>
   <div>
   <NavBar/>
      <div className="container-fluid p-0">
        <div className="d-flex">
          <div className='vh-100'>
            <SideBar />
          </div>
          <div className='w-100 overflow-y-auto vh-100 '>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
      </>
}
