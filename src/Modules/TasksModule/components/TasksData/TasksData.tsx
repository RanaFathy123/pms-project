import { useForm } from "react-hook-form";

export default function TasksData() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <div className="container mt-2">
      <div className="container">
        <i className="fa-solid fa-chevron-left bg-transparent" />
        <span className="mx-2">View All Tasks</span>
        <h3 className="mt-2  mx-2">Add a New Task</h3>
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
                      {...register("title")}
                    />
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
                      {...register("description")}
                    ></textarea>
                    <div className="row justify-content-between px-3">
                      <div className="col-md-5">
                        <label
                          htmlFor="userId"
                          className="text-black mt-3 mb-2"
                        >
                          User
                        </label>
                        <select className="form-select" id="userId">
                          <option value="" className="text-muted">
                            No Users Selected
                          </option>
                        </select>
                      </div>
                      <div className="col-md-5">
                        <label
                          htmlFor="projectId"
                          className="text-black mt-3 mb-2"
                        >
                          Project
                        </label>
                        <select className="form-select" id="projectId">
                          <option value="" className="text-muted">
                            No Status Selected
                          </option>
                        </select>
                      </div>
                      
                    </div>
                    <div className="d-flex justify-content-between  mt-3 flex-wrap">
                        <button className="btn btn-danger rounded ">
                          Cancel
                        </button>
                        <button className="btn btn-warning rounded">
                          Save
                        </button>
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
