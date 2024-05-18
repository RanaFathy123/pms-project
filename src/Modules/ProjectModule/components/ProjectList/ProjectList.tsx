import axios from "axios";
import { useContext, useEffect, useState } from "react";
import DynamicHeader from "../../../SharedModules/components/DynamicHeader/DynamicHeader";
import { AuthContext } from "../../../../context/AuthContext";
import NoData from "../../../SharedModules/components/NoData/NoData";

export default function ProjectList() {
  const [ProjectsList, setProjectsList] = useState([]);
  const [showIconIndex, setShowIconIndex] = useState(null);

  let { baseUrl }: any = useContext(AuthContext);

  const handleShowing = (index: any) => {
    setShowIconIndex(index === showIconIndex ? null : index);
  };

  async function getProjectsList() {
    try {
      let response = await axios.get(
        `${baseUrl}/Project/manager?title=&pageSize=&pageNumber=`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      setProjectsList(response.data.data);
    } catch (error) {}
  }

  useEffect(() => {
    getProjectsList();
  }, []);
  return (
    <>
      <DynamicHeader title={"Projects"} btn={"Project"} />
      {ProjectsList.length === 0 ? (
        <div className="container text-center">
          <NoData />
        </div>
      ) : (
        <div className="bg-body-tertiary p-3 height">
          <div className="container ">
            <div className="row  bg-white rounded-4  shadow-sm ">
              <div className="col-md-4 col-lg-3 ">
                <div className="search-container position-relative my-3 px-3">
                  <i className="fa fa-search position-absolute "></i>
                  <input
                    type="search"
                    placeholder="Search by title.."
                    className="rounded-pill form-control p-2 ps-5"
                  />
                </div>
              </div>
              <div className="col-md-12 col-sm-12 ">
                <div className="table-responsive-sm table-responsive-md">
                  <table className="table table-striped text-center w-100">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title</th>
                        <th scope="col">Nums Task</th>
                        <th scope="col">Date Creation</th>
                        <th scope="col">Description</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ProjectsList?.map((project: any, index) => (
                        <tr key={project.id}>
                          <td>{project.id}</td>
                          <td>{project.title}</td>
                          <td>{project.task.length}</td>
                          <td>
                            {new Date(project.creationDate).toLocaleDateString(
                              "en-US"
                            )}
                          </td>
                          <td>{project.description}</td>

                          <td className="position-relative">
                            <i
                              onClick={() => handleShowing(index)}
                              className="fa-solid fa-ellipsis-vertical"
                            ></i>
                            <div className="position-absolute icons">
                              {showIconIndex === index && (
                                <>
                                  <div className="triangleUp"> </div>

                                  <div className="icon-container d-flex flex-column bg-white p-3 rounded-3 width text-start">
                                    <span className="text-success">
                                      {" "}
                                      <i className="fa-regular fa-eye my-1"></i>{" "}
                                      View
                                    </span>
                                    <span className="text-success">
                                      <i className="fa-solid fa-pen-to-square my-2"></i>{" "}
                                      Edit
                                    </span>
                                    <span className="text-success">
                                      {" "}
                                      <i className="fa-solid fa-trash my-1"></i>{" "}
                                      Delete
                                    </span>
                                  </div>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
