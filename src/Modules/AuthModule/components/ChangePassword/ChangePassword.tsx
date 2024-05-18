import { useForm } from "react-hook-form";
import logo from "../../../../assets/images/PMS 3.svg";
import { FormDataChangPass } from "../../../../interfaces/Auth";
import "../Login/Login.css";
import { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";

export default function ChangePassword({ Logout }) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormDataChangPass>();

  const { baseUrl } : any = useContext(AuthContext);
  const navigate = useNavigate()
  // Password eye
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prevState: boolean) => !prevState);
  };

  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);

  const togglePasswordVisibility2 = (): void => {
    setShowNewPassword((prevState: boolean) => !prevState);
  };

  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const togglePasswordVisibility3 = (): void => {
    setShowConfirmPassword((prevState: boolean) => !prevState);
  };

  const onSubmit = async (data: FormDataChangPass) => {
    try {
      let response = await axios.put(`${baseUrl}/Users/ChangePassword`,
      data,
      {
        headers: { Authorization: `Bearer ${ localStorage.getItem("token")}` },
      }
    )
      Logout();
      navigate('/login');
      toast.success(response.data.message || 'Password has been updated successfully');
    }
    catch(error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="background-pass">
        <div className="mt-1 text-center">
                <img src={logo} alt="" className="w-50" />
        </div>
        <div className="form">
          <form
            className="p-3 rounded-4 my-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="text my-1">
              <h2>Change Password</h2>
            </div>
                <div className="row">
                  <div className="col-md-11 mt-3 p-3 ">
                    {/* Old Password */}
                    <div className="visibilty-password input m-3">
                      <label
                        className="color-text "
                        htmlFor="exampleFormControlInput2"
                      >
                        oldPassword
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control shadow-none"
                        style={{
                          backgroundColor: showPassword
                            ? "transparent"
                            : "#fff",
                          borderTop: showPassword ? "none" : "",
                          borderRight: showPassword ? "none" : "",
                          borderLeft: showPassword ? "none" : "",
                          borderRadius: showPassword ? "0px" : "",
                          color: showPassword  ? "white" :  "",
                        }}
                        placeholder="Enter your Old Password"
                        {...register("oldPassword", {
                          required: "oldPassword is required ",
                          pattern: {
                            value:
                              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                            message:
                              "Password must contain at least 8 characters, including upper and lowercase letters, and numbers",
                          },
                        })}
                      />
                      {/* button eye password */}
                      <button
                        className="btn btn-outline-secondary for-visibilty-password-button"
                        type="button"
                        onClick={togglePasswordVisibility}
                        title=" btn"
                      >
                        <i
                          className={`fa-regular fa-eye${
                            !showPassword ? "-slash" : ""
                          }`}
                        ></i>
                      </button>
                      {/* <div className="border_bottom"></div> */}
                    </div>
                    {errors.oldPassword && (
                      <div className="alert alert-warning p-1 mx-2">
                        {errors?.oldPassword?.message}
                      </div>
                    )}
                    {/* New Password  */}
                    <div className="visibilty-password input m-3">
                      <label
                        className="color-text "
                        htmlFor="exampleFormControlInput2"
                      >
                        New Password
                      </label>
                      <input
                        type={showNewPassword ? "text" : "password"}
                        className="form-control shadow-none"
                        style={{
                          backgroundColor: showNewPassword
                            ? "transparent"
                            : "#fff",
                          borderTop: showNewPassword ? "none" : "",
                          borderRight: showNewPassword ? "none" : "",
                          borderLeft: showNewPassword ? "none" : "",
                          borderRadius: showNewPassword ? "0px" : "",
                          color: showNewPassword  ? "white" :  "",
                        }}
                        placeholder="Enter your New Password"
                        {...register("newPassword", {
                          required: "newPassword is required ",
                          pattern: {
                            value:
                              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                            message:
                              "Password must contain at least 8 characters, including upper and lowercase letters, and numbers",
                          },
                        })}
                      />
                      {/* button eye password */}
                      <button
                        className="btn btn-outline-secondary for-visibilty-password-button"
                        type="button"
                        onClick={togglePasswordVisibility2}
                        title=" btn"
                      >
                        <i
                          className={`fa-regular fa-eye${
                            !showNewPassword ? "-slash" : ""
                          }`}
                        ></i>
                      </button>
                      {/* <div className="border_bottom"></div> */}
                    </div>
                    {errors.newPassword && (
                      <div className="alert alert-warning p-1 mx-2">
                        {errors.newPassword.message}
                      </div>
                    )}
                    {/* Confirm New Password  */}
                    <div className="visibilty-password input m-3">
                      <label
                        className="color-text "
                        htmlFor="exampleFormControlInput2"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control shadow-none"
                        style={{
                          backgroundColor: showConfirmPassword
                            ? "transparent"
                            : "#fff",
                          borderTop: showConfirmPassword ? "none" : "",
                          borderRight: showConfirmPassword ? "none" : "",
                          borderLeft: showConfirmPassword ? "none" : "",
                          borderRadius: showConfirmPassword ? "0px" : "",
                          color: showConfirmPassword  ? "white" :  "",
                        }}
                        placeholder="Confirm New Password"
                        {...register("confirmNewPassword", {
                          required: "confirmNewPassword is required ",
                          validate: (value) =>
                            value === watch("newPassword") ||
                            "the passwords dont match ",
                          pattern: {
                            value:
                              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                            message:
                              "Password must contain at least 8 characters, including upper and lowercase letters, and numbers",
                          },
                        })}
                      />
                      {/* button eye password */}
                      <button
                        className="btn btn-outline-secondary for-visibilty-password-button"
                        type="button"
                        onClick={togglePasswordVisibility3}
                        title=" btn"
                      >
                        <i
                          className={`fa-regular fa-eye${
                            !showConfirmPassword ? "-slash" : ""
                          }`}
                        ></i>
                      </button>
                      {/* <div className="border_bottom"></div> */}
                    </div>
                    {errors.confirmNewPassword && (
                      <div className="alert alert-warning p-1 mx-2">
                        {errors.confirmNewPassword.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="button mt-4">
                  <div className="d-grid gap-2 col-md-9   mx-auto my-3">
                    <button
                      type="submit"
                      className="btn text-white rounded-pill submit p-1"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
        </div>
      </div> 
    </>
  )
}


