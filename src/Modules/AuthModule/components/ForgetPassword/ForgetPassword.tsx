import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../../../../src/assets/images/PMS 3.png";
import { axiosInstance } from "../../../../axiosConfig/axiosInstance";
import "./ForgetPassword.css";

export default function ForgetPassword() {

  let navigat = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    try {
      let response = await axiosInstance.post(
        `/Users/Reset/Request`,
        data
      );
      toast.success(response.data.message);
      navigat("/reset-pass");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className="Authcontainer">
        <div className="container ">
          <div className="row justify-content-center align-items-center vh-100 ">
            <div className="col-md-6 ">
              <div className="image w-50 m-auto">
                <img src={logo} alt="Logo" className="w-100" />
              </div>
              <div className="formbox w-100">
                <form
                  className="p-5 rounded-4 my-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="text text-white ms-3">
                    <p className="text-Auth">Welcome to PMS</p>
                    <h2>Forget Password</h2>
                  </div>

                  <div className="input m-3">
                    <label
                      className="color-text"
                      htmlFor="exampleFormControlInput1"
                    >
                      Email
                    </label>
                    <br />
                    <input
                      id="exampleFormControlInput1"
                      type="email"
                      className="form-control p-4 shadow-none"
                      placeholder="Enter Your E-mail"
                      {...register("email", {
                        required: "Email Is Required",
                        pattern: {
                          value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                          message: "Email Is Not Vaild",
                        },
                      })}
                    />
                  </div>
                  {errors?.email && (
                    <p className="alert alert-warning p-2 mx-2">
                      {errors?.email?.message?.toString()}
                    </p>
                  )}

                  <div className="button">
                    <div className="d-grid gap-2 col-5 mx-auto my-3">
                      <button className="btn text-white rounded-pill submit">
                        Verify
                      </button>
                    </div>
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
