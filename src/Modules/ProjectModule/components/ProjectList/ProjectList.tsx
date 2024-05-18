import axios from "axios";
import { SetStateAction, useContext, useEffect, useState } from "react";
import DynamicHeader from "../../../SharedModules/components/DynamicHeader/DynamicHeader";
import { AuthContext } from "../../../../context/AuthContext";
import NoData from "../../../SharedModules/components/NoData/NoData";
import { Button, Modal } from "react-bootstrap";
import DeleteData from "../../../SharedModules/components/DeleteData/DeleteData";



export default function ProjectList() {
  const [ProjectsList, setProjectsList] = useState([]);
  const [showIconIndex, setShowIconIndex] = useState(null);
 let {baseUrl}= useContext(AuthContext)
  const handleShowing = (index: any) => {
    setShowIconIndex(index === showIconIndex ? null : index);
  };
  //  Delete Project Module 
  const [showDelete, setDeleteShow] = useState(false);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = (id: SetStateAction<undefined>) => {
    setItemId(id)
    setDeleteShow(true);
  }
  const [itemId,setItemId] = useState();

  // Get List
  async function getProjectsList() {
    try {
      let response = await axios.get(
        `${baseUrl}/Project/manager?title=&pageSize=&pageNumber=`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setProjectsList(response.data.data);
      console.log(response.data.data, "FROM project");
    } catch (error:any) {
      console.log(error.data.data);

    }
  }


// eslint-disable-next-line @typescript-eslint/no-explicit-any
// Delete Project Api
const deleteProject=async()=>{
  try{
const response= await axios.delete(`${baseUrl}/Project/${itemId}`,
  {
    headers:{ Authorization: `Bearer ${localStorage.getItem("token")}` },
  }
)
console.log(response);
handleDeleteClose();
getProjectsList();

  }catch(error){
console.log(error);

  }
}


  useEffect(() => {
    getProjectsList();
  }, []);
  return (
    <>

      <DynamicHeader title={"Projects"} btn={"Project"} />

    {/* Delete Project Module */}
<Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h3>Delete Project</h3>
        </Modal.Header>
        <Modal.Body>
  <DeleteData deleteItem={'Project'}/>  
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={deleteProject}>
          Delete this item         
            </Button>
        </Modal.Footer>

      </Modal>

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
                />
              </div>
              {/* Table */}
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
                      <tr>
                        <td key={project.id} >
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
                              <div className="icon-container d-flex flex-column  bg-white p-3 rounded-3 shadow-sm">
                                <i className="fa-regular fa-eye text-success my-1 pe-2"></i>
                                {/* Delete */}
                                <i
                                  className="fa-solid fa-trash text-danger my-1 pe-2" 
                                  onClick={()=>handleDeleteShow(project.id)}
                                  ></i>
                                <i className="fa-solid fa-pen-to-square text-warning my-1"></i>
                              </div>
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
      </div>}
    </>
  );
}
