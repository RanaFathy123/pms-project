import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'

export default function MasterLayout() {
  return (
    <div>
      <NavBar/>
      <div className="row">
        <div className="col-md-3">
          <SideBar/>
        </div>
        <div className="col-md-8">
        <Outlet/>
        </div>
      </div>
    </div>
  )
}
