import { useContext } from "react";
import { Link } from "react-router-dom";
import Nodata from "../../../../assets/images/no-data.png";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstance";
import { AllUsersContext } from "../../../../context/AllUsersContext";
import NoData from "../../../SharedModules/components/NoData/NoData";

export default function UsersList() {
  const {
    allUsersList,
    pageSize,
    getUsersList,
    TitleValue,
    UserValue,
    GetTitleValue,
    GetUserValue,
    currentPageNumber,
  } = useContext(AllUsersContext);

  async function toggledEmployee(id: number) {
    try {
      let response = await axiosInstanceWithHeaders.put(`/Users/${id}`);
      getUsersList("", "", 5, currentPageNumber);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
    {allUsersList.length == 0 ?<NoData/>:
     <div className="bg-body-tertiary p-3 height">
     <div className="container ">
       <div className="row bg-white rounded-4 p-0 shadow-sm align-middle">
         <div className=" col-sm-12 col-md-4 col-lg-3 ">
           <div className="search-container position-relative my-3 px-3">
             <i className="fa fa-search search position-absolute"></i>
             <input
               type="search"
               placeholder="Search by title.."
               className="rounded-pill form-control p-2 ps-5"
               onChange={GetTitleValue}
             />
           </div>
         </div>
         <div className=" col-sm-12 col-md-4 col-lg-3 ">
           <div className="search-container  my-3 px-3">
             <select
               onChange={GetUserValue}
               className="rounded-pill form-control p-2 ps-5"
             >
               <option disabled>Select user Role</option>
               <option value="1">Manager</option>
               <option value="2">Employee</option>
             </select>
           </div>
         </div>

         <div className="col-md-12 col-sm-12">
           <div className="table-responsive-sm table-responsive-md table-responsive-lg">
             <table className="table table-striped text-center w-100 users-table">
               <thead>
                 <tr>
                   <th scope="col">#</th>
                   <th scope="col">Image</th>
                   <th scope="col">User Name</th>
                   <th scope="col">Status</th>
                   <th scope="col">Phone Number </th>
                   <th scope="col">Email </th>
                   <th scope="col">Creation Date </th>
                 </tr>
               </thead>
               <tbody>
                 {allUsersList?.map((User: any) => (
                   <tr key={User.id}>
                     <td>{User.id}</td>
                     <td>
                       {User.imagePath ? (
                         <img
                           src={`https://upskilling-egypt.com:3003/${User.imagePath}`}
                           className="rounded border border-1"
                           style={{ width: "56px", height: "56px" }}
                           alt=""
                         />
                       ) : (
                         <img
                           src={Nodata}
                           className="rounded border border-1"
                           style={{ width: "56px", height: "56px" }}
                           alt=""
                         />
                       )}
                     </td>
                     <td>{User.userName}</td>
                     <td>
                       {User.isActivated ? (
                         <i
                           onClick={() => toggledEmployee(User?.id)}
                           className="fa-solid fa-toggle-on text-success fa-2x"
                         ></i>
                       ) : (
                         <i
                           onClick={() => toggledEmployee(User?.id)}
                           className="fa-solid fa-toggle-off text-danger fa-2x"
                         ></i>
                       )}
                     </td>
                     <td>{User.phoneNumber}</td>
                     <td>{User.email}</td>
                     <td>
                       {new Date(User.creationDate).toLocaleDateString(
                         "en-US"
                       )}
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
         </div>
         <div className="d-flex justify-content-center mt-5">
           <nav aria-label="Page navigation example ">
             <ul className="pagination ">
               <li className="page-item">
                 <a
                   className="page-link color"
                   href="#"
                   aria-label="Previous"
                 >
                   <span aria-hidden="true">&laquo;</span>
                 </a>
               </li>
               {pageSize?.slice(0, 5)?.map((pageNo: any, index: number) => (
                 <li key={index} className="page-item">
                   <Link
                     className="page-link color"
                     to={""}
                     onClick={() => {
                       getUsersList(TitleValue, UserValue, "5", pageNo);
                     }}
                   >
                     {pageNo}
                   </Link>
                 </li>
               ))}
               <li className="page-item">
                 <a className="page-link color" href="#" aria-label="Next">
                   <span aria-hidden="true">&raquo;</span>
                 </a>
               </li>
             </ul>
           </nav>
         </div>
       </div>
     </div>
   </div>}
     
    </>
  );
}
