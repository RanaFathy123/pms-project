import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar'
import SideBar from '../SideBar/SideBar'

export default function MasterLayout() {
  return <>
    <div className=' w-100'>
      <NavBar/>
      <header/>
      </div>
      <div className=" d-flex">
        <div >
          <SideBar/>
        </div>
        <div >
        <Outlet/>
        </div>
      </div>
      </>
}
