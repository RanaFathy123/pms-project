import { useContext, useState } from "react";
import { ProjectContext } from "../../../../context/ProjectContext";
import DynamicHeader from "../../../SharedModules/components/DynamicHeader/DynamicHeader";
import NoData from "../../../SharedModules/components/NoData/NoData";

export default function ProjectList() {
  const [showIconIndex, setShowIconIndex] = useState(null);
  let { projectsList } = useContext(ProjectContext);


  const handleShowing = (index: any) => {
    setShowIconIndex(index === showIconIndex ? null : index);
  };

  
  return (
    <>
      <DynamicHeader title={"Projects"} btn={"Project"} />
      {projectsList.length === 0 ? (
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
                      {projectsList?.map((project: any, index) => (
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
