import { SetStateAction, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectContext } from "../../../../context/ProjectContext";
import DynamicHeader from "../../../SharedModules/components/DynamicHeader/DynamicHeader";
import NoData from "../../../SharedModules/components/NoData/NoData";

import { Button, Modal } from "react-bootstrap";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstance";
import DeleteData from "../../../SharedModules/components/DeleteData/DeleteData";

export default function ProjectList() {
  const [showIconIndex, setShowIconIndex] = useState(null);
  const [showDelete, setDeleteShow] = useState(false);
  const [itemId, setItemId] = useState(0);
  let { projectsList, getProjectsList } = useContext(ProjectContext);


  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = (id: number) => {
    setItemId(id);
    setDeleteShow(true);
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // Delete Project Api
  const deleteProject = async () => {
    try {
      const response = await axiosInstanceWithHeaders.delete(
        `/Project/${itemId}`
      );
      getProjectsList();
      console.log(response);
      handleDeleteClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleShowing = (index: any) => {
    setShowIconIndex(index === showIconIndex ? null : index);
  };

  return (
    <>
      <DynamicHeader title={"Projects"} btn={"Project"} />
      {/* Delete Project Module */}
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h3>Delete Project</h3>
        </Modal.Header>
        <Modal.Body>
          <DeleteData deleteItem={"Project"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteProject}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
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
                                      <Link
                                        to={`/dashboard/project-data/${project.id}`}
                                        className="text-decoration-none"
                                        state={{
                                          updateData: project,
                                          type: "update",
                                        }}
                                      >
                                        <i className="fa-solid fa-pen-to-square text-warning my-1"></i>{" "}
                                        Edit
                                      </Link>{" "}
                                    </span>
                                    <span className="text-success">
                                      <div
                                        onClick={() =>
                                          handleDeleteShow(project.id)
                                        }
                                      >
                                        <i className="fa-solid fa-trash my-1"></i>{" "}
                                        Delete
                                      </div>
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
