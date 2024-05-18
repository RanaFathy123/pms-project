import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DynamicHeader from "../../../SharedModules/components/DynamicHeader/DynamicHeader";
import { AuthContext } from "../../../../context/AuthContext";
import NoData from "../../../SharedModules/components/NoData/NoData";

export default function ProjectList() {
  const [ProjectsList, setProjectsList] = useState([]);
  const [showIconIndex, setShowIconIndex] = useState(null);
  const [titleValue, setTitleValue] = useState('');
  const [arrayOfPages, setArrayOfPages] = useState([]);

 let { baseUrl } : any = useContext(AuthContext)

  const handleShowing = (index: any) => {
    setShowIconIndex(index === showIconIndex ? null : index);
  };

  async function getProjectsList( title: any, pageSize: any, pageNumber: any ) {
    try {
      let response = await axios.get(
        `${baseUrl}/Project/manager/?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          params: { title: title },
        }
      );
      setArrayOfPages(Array(response.data.totalNumberOfPages).fill().map((_,i) => i+1) );
      setProjectsList(response.data.data);
    } catch (error) {}
  }

  useEffect(() => {
    getProjectsList("", 10, 1);
  }, []);

  const getTitleValue = (input: any) => {
    setTitleValue(input.target.value);
    getProjectsList(input.target.value, 10, 1);
  };

  return (
    <>
      <DynamicHeader title={"Projects"} btn={"Project"} />
     {ProjectsList.length === 0 ? <div className="container text-center"><NoData/></div> : <div className="bg-body-tertiary p-3">
        <div className="container ">
          <div className="row d-flex justify-content-center ">
            <div className="col-md-12 col-sm-12 my-sm-3 my-md-1 my-lg-3 bg-white rounded-4  shadow-sm p-5">
              <div className="search-container position-relative my-3">
                <i className="fa fa-search position-absolute "></i>
                <input
                  type="search"
                  placeholder="Search..."
                  className="rounded-pill form-control p-2 ps-5"
                  onChange={getTitleValue}
                />
              </div>
              <div className="table-responsive-sm table-responsive-md">
                <table className="table table-striped text-center w-100">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Date Creation</th>
                      <th scope="col">Modification Date</th>
                      <th scope="col">Description</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ProjectsList?.map((project: any, index) => (
                      <tr key={project.id} >
                        <td>
                          {project.id}
                        </td>
                        <td>{project.title}</td>
                        <td>
                          {new Date(project.creationDate).toLocaleDateString(
                            "en-US"
                          )}
                        </td>
                        <td>
                          {new Date(
                            project.modificationDate
                          ).toLocaleDateString("en-US")}
                        </td>
                        <td>{project.description}</td>
                        <td className="position-relative">
                          <i
                            onClick={() => handleShowing(index)}
                            className="fa-solid fa-ellipsis"
                          ></i>
                          <div className="position-absolute icons ">
                            {showIconIndex === index && (
                              <div className="icon-container d-flex flex-column bg-white p-3 rounded-3 shadow-sm">
                                <i className="fa-regular fa-eye text-success my-1"></i>
                                <i className="fa-solid fa-trash text-danger my-1"></i>
                                <i className="fa-solid fa-pen-to-square text-warning my-1"></i>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <nav aria-label="Page navigation example">
                  <ul className="pagination justify-content-end">
                    <li className="page-item disabled">
                      <a className="page-link">Previous</a>
                    </li>

                    {arrayOfPages.map((pageNo) => 
                      <li key={pageNo} className="page-item" onClick={() => getProjectsList(titleValue , 10 ,pageNo)}>
                        <a className="page-link text-secondary">
                          {pageNo}
                        </a>
                      </li>                      
                    )}

                    <li className="page-item">
                      <a className="page-link text-secondary">Next</a>
                    </li>
                  </ul>
                </nav>

              </div>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
}
