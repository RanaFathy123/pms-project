import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import DynamicHeader from "../../../SharedModules/components/DynamicHeader/DynamicHeader";
import NoData from "../../../SharedModules/components/NoData/NoData";
import { Link, useSearchParams } from "react-router-dom";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstance";
import ResponsivePagination from "react-responsive-pagination";
import "react-responsive-pagination/themes/classic.css";
import "./TasksList.css";
import { Button, Modal } from "react-bootstrap";
import DeleteData from "../../../SharedModules/components/DeleteData/DeleteData";

export default function TasksList() {
  const [TasksList, setTasksList] = useState([]);
  const [showIconIndex, setShowIconIndex] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [showDelete, setDeleteShow] = useState(false);
  const [itemId, setItemId] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const title = searchParams.get("title");
  let { loginData } = useContext(AuthContext);

  const handleShowing = (index: any) => {
    setShowIconIndex(index === showIconIndex ? null : index);
  };
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = (id: number) => {
    setItemId(id);
    setDeleteShow(true);
  };
  const deleteTask = async () => {
    try {
      const response = await axiosInstanceWithHeaders.delete(`/Task/${itemId}`);
      if (title) {
        getTasksList(title, 5, currentPage);
      } else {
        getTasksList("", 5, currentPage);
      }
      console.log(response);
      handleDeleteClose();
    } catch (error) {
      console.log(error);
    }
  };
  const getTaskValue = (input: string) => {
    if (title) {
      getTasksList(title, 5, 1);
      setSearchParams({ title: input });
    } else {
      getTasksList("", 5, 1);
      setSearchParams({ title: input });
    }
  };
  async function getTasksList(
    title: string,
    pageSize: number,
    pageNumber: number
  ) {
    try {
      let response = await axiosInstanceWithHeaders.get(
        `/Task/manager?title=${title}&pageSize=${pageSize}&pageNumber=${pageNumber}`
      );
      const tasks = response.data.data;
      setTasksList(tasks);
      const totalPages = response.data.totalNumberOfPages;
      setTotalPages(totalPages);
      const cuurentPage = response.data.pageNumber;
      setCurrentPage(cuurentPage);
    } catch (error) {}
  }

  useEffect(() => {
    if (title) {
      getTasksList(title, 5, currentPage);
    } else {
      getTasksList("", 5, currentPage);
    }
  }, [loginData, title, currentPage]);
  return (
    <>
      <DynamicHeader title={"Tasks"} btn={"Task"} />
      {/* Delete Project Module */}
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h3>Delete Project</h3>
        </Modal.Header>
        <Modal.Body>
          <DeleteData deleteItem={"Project"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteTask}>
            Delete this item
          </Button>
        </Modal.Footer>
      </Modal>
      {TasksList.length === 0 ? (
        <div className="container text-center">
          <NoData />
        </div>
      ) : (
        <div className="bg-body-tertiary p-3 height">
          <div className="container ">
            <div className="row bg-white rounded-4 p-0 shadow-sm ">
              <div className="col-md-4 col-lg-3 ">
                <div className="search-container position-relative my-3 px-3">
                  <i className="fa fa-search position-absolute search"></i>
                  <input
                    type="search"
                    placeholder="Search by title.."
                    className="rounded-pill form-control p-2 ps-5"
                    onChange={(e) => {
                      getTaskValue(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="col-md-12 col-sm-12">
                <div className="table-responsive-sm table-responsive-md">
                  <table className="table table-striped text-center w-100">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Title </th>
                        <th scope="col">Status </th>
                        <th scope="col">Users </th>
                        <th scope="col">Project </th>
                        <th scope="col">Creation Date </th>
                        <th scope="col">Actions </th>
                      </tr>
                    </thead>
                    <tbody>
                      {TasksList?.map((Tasks: any, index) => (
                        <tr key={Tasks.id}>
                          <td>{Tasks.id}</td>
                          <td>{Tasks.title}</td>
                          <td>
                            {Tasks.status === "InProgress" ? (
                              <button className="btn rounded-pill btn-Done text-white">
                                {Tasks.status}
                              </button>
                            ) : (
                              ""
                            )}
                            {Tasks.status === "ToDo" ? (
                              <button className="btn rounded-pill btn-ToDo text-white">
                                {Tasks.status}
                              </button>
                            ) : (
                              ""
                            )}
                            {Tasks.status === "Done" ? (
                              <button className="btn rounded-pill btn-InProgress text-white">
                                {Tasks.status}
                              </button>
                            ) : (
                              ""
                            )}
                          </td>
                          <td>{Tasks.employee?.userName}</td>
                          <td>{Tasks.project?.title}</td>

                          <td>
                            {new Date(Tasks.creationDate).toLocaleDateString(
                              "en-US"
                            )}
                          </td>
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
                                      <i className="fa-regular fa-eye my-1"></i>
                                      View
                                    </span>
                                    <span className="text-success">
                                      <Link
                                        to={`/dashboard/edit-task-data/${Tasks.id}`}
                                        state={{ Tasks, type: "edit" }}
                                      >
                                        <i className="fa-solid fa-pen-to-square my-2"></i>
                                      </Link>
                                      Edit
                                    </span>
                                    <span
                                      className="text-success"
                                      onClick={() => handleDeleteShow(Tasks.id)}
                                    >
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
                  <ResponsivePagination
                    current={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
