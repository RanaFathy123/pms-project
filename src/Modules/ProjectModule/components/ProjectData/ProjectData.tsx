import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { axiosInstanceWithHeaders } from "../../../../axiosConfig/axiosInstance";
import "./ProjectData.css";

export default function ProjectData() {
  interface projectData {
    title: string;
    description: string;
    manager?: {};
    id: number;
    creationDate: string;
    modificationDate: string;
  }
  let location = useLocation();
  console.log(location);
  let status = location.state?.type === "update";
  let updateData = location.state?.updateData;
  const navigate = useNavigate();

  let { register, handleSubmit, reset } = useForm<projectData>();

  const onsubmitForm = async (data: projectData) => {
    try {
      let respons = await axiosInstanceWithHeaders({
        method: status ? "put" : "post",
        url: status ? `/Project/${updateData.id}` : `/Project`,
        data: data,
      });
      toast.success(
        status ? "your Project Is Updated " : "your Project Is Created"
      );
      navigate("/dashboard/projects");
      console.log(respons);
    } catch (error: any) {
      toast.error(
        status
          ? error.message || "your Project Is Not Updated"
          : error.message || "your Project Is Not Created"
      );
    }
  };

  return (
    <>
      <div className="header p-4">
        <Link
          to="/dashboard/projects"
          className="text-decoration-none text-muted   "
        >
          <i className="fa-solid fa-less-than"></i>
          <span className=" fs-5 ps-2">View All Project</span>
        </Link>
        <h2 className="main-color pt-3">Add a New Project </h2>
      </div>
      <div className="inputs-container container-fluid py-5   ">
        <div className="row d-flex justify-content-center align-items-center">
          <div className=" col-lg-8 col-md-10 col-sm-10 ">
            <div className=" inputForm rounded-3 bg-white shadow-lg p-5 ">
              <div>
                <form
                  action=""
                  className="bg-white"
                  onSubmit={handleSubmit(onsubmitForm)}
                >
                  <div className="form-group mb-3">
                    <label
                      htmlFor="tiltelProject"
                      className="form-label  text-muted "
                    >
                      Titel
                    </label>

                    <input
                      className="form-control "
                      id="tiltelProject"
                      placeholder="Name"
                      {...register("title", {
                        required: "Tiltel Project is Requird",
                      })}
                      defaultValue={status ? updateData.title : ""}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label
                      htmlFor="discripationProject"
                      className="form-label text-muted  "
                    >
                      Discription
                    </label>

                    <textarea
                      id="discripationProject"
                      className="form-control"
                      placeholder=" Discription"
                      rows={4}
                      {...register("description")}
                      defaultValue={status ? updateData.description : ""}
                    ></textarea>
                  </div>
                  <hr className="w-100 " />
                  <div className="btn-group d-flex justify-content-between align-items-center  ">
                    <button
                      className=" rounded-pill save-btn text-white px-4 py-2 border-0"
                      type="submit"
                    >
                      Save
                    </button>
                    <button
                      className=" rounded-pill bg-transparent cancel-btn px-4 py-2  "
                      type="reset"
                      onClick={() => reset()}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
