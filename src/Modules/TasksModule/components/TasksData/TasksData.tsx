import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstance";
import { ProjectContext } from "../../../../context/ProjectContext";
import { UsersContext } from "../../../../context/UsersContext";
import {
  descriptionValidation,
  titleValidation,
} from "../../../../validations/validation";
import { AuthContext } from "../../../../context/AuthContext";

export default function TasksData() {
  const [projectId,setProjectId]=useState('')
  const[userId,setUserId]=useState('')
  const { state } = useLocation();
  const { Tasks, type } = state || {};
  console.log(Tasks, type);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const { projectsList } = useContext(ProjectContext);
  const { usersList } = useContext(UsersContext);
  const { loginData } = useContext(AuthContext);
  interface TaskDataType {
    title?: string;
    description?: string;
    employeeId?: number;
    projectId?: number;
  }
  const onSubmit = async (data: TaskDataType) => {
    try {
      const response = await axiosInstanceWithHeaders({
        method: type ? "put" : "post",
        url: type && Tasks ? `/Task/${Tasks.id}` : "/Task",
        data,
      });
      navigate("/dashboard/tasks");
      toast.success(
        type && Tasks ? "Task Updated Successfully" : "Task added Successfully"
      );
    } catch (error) {
      console.log(error);
    }
  };

  interface Project {
    id: number;
    title: string;
    description: string;
    creationDate: string;
    modificationDate: string;
    task: [];
    manager?: {
      id?: string;
      userName?: string;
      imagePath?: string;
      email?: string;
      password?: string;
      country?: string;
      phoneNumber?: string;
      verificationCode?: string | null;
      isVerified?: Boolean;
      isActivated?: Boolean;
      creationDate?: string;
      modificationDate?: string;
    };
  }
  useEffect(() => {
    if (Tasks && type) {
      setValue("title", Tasks.title);
      setValue("description", Tasks.description);
      setProjectId(Tasks.project?.id)
      setUserId(Tasks.employee?.id)
    }
  }, [loginData]);

  return (
    <div className="container mt-2">
      <div className="container">
        <i className="fa-solid fa-chevron-left bg-transparent" />
        <Link to="/dashboard/tasks" className="text-decoration-none text-black">
          <span className="mx-2 ">View All Tasks</span>
        </Link>
        <h3 className="mt-2  mx-2">{type ? "Edit Task" : "Add a New Task"}</h3>
      </div>
      <>
        <div>
          <div className="container-fluid  ">
            <div className="row mt-5 h-100 justify-content-center align-items-center ">
              <div className="col-md-9 bg-white p-5  rounded  form-body shadow-lg">
                <div className="form-content p-3">
                  <form
                    className="bg-transparent border-0 "
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <label htmlFor="titleId" className="text-black mb-2">
                      Title
                    </label>
                    <input
                      id="titleId"
                      className="form-control border border-2 px-3 rounded"
                      placeholder="Name"
                      {...register("title", titleValidation)}
                    />
                    {errors?.title && (
                      <div className="alert alert-warning p-2 my-3">
                        {errors?.title?.message?.toString()}
                      </div>
                    )}
                    <label
                      htmlFor="descriptionId"
                      className="text-black mb-2 mt-3"
                    >
                      Description
                    </label>
                    <textarea
                      id="descriptionId"
                      className="form-control border border-2 px-3 py-1 rounded"
                      placeholder="Description"
                      {...register("description", descriptionValidation)}
                    ></textarea>
                    {errors?.description && (
                      <div className="alert alert-warning p-2 my-3">
                        {errors?.description?.message?.toString()}
                      </div>
                    )}
                    <div className="row justify-content-between px-3">
                      <div className="col-md-5">
                        <label
                          htmlFor="userId"
                          className="text-black mt-3 mb-2"
                        >
                          User
                        </label>
                        <select
                          value={userId}

                          className="form-select"
                          id="userId"
                          {...register("employeeId", {
                            onChange: (e:any) => {
                              setUserId(e.target.value)
                            },
                          })}
                        >
                          {usersList.map((user: any) => (
                            <option value={user.id} key={user.id}>
                              {user.userName}
                            </option>
                          ))}
                        </select>
                      </div>
                      {errors?.employeeId && (
                        <div className="alert alert-warning p-2 my-3">
                          {errors?.employeeId?.message?.toString()}
                        </div>
                      )}
                      <div className="col-md-5">
                        <label
                          htmlFor="projectId"
                          className="text-black mt-3 mb-2"
                        >
                          Project
                        </label>
                        <select
                          value={projectId}
                          className="form-select"
                          {...register("projectId", {
                            onChange: (e:any) => {
                             setProjectId(e.target.value)
                            },
                          })}
                          id="projectId"
                        >
                          {projectsList.map((project: Project) => (
                            <option key={project.id} value={project.id}>
                              {project.title}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between  mt-3 flex-wrap">
                      <button className="btn btn-danger rounded ">
                        Cancel
                      </button>
                      <button className="btn btn-warning rounded">Save</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}
