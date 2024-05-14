import { useForm } from "react-hook-form";
import logo from "../../../../assets/images/PMS 3.svg";
import { FormDataChangPass } from "../../../../interfaces/Auth";
import "../Login/Login.css";
import "./ChangePassword.css";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function ChangePassword() {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataChangPass>();

  // Password eye
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prevState: boolean) => !prevState);
  };

  const onSubmit = async (data: FormDataChangPass) => {
    // console.log(data);   
    try {
      const response = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
        data,
        {
          headers: {
           Authorization: `Bearer ${ localStorage.getItem("token")}` ,
          },
        }
      );
      console.log(response);
      toast.success("Change Password Success", response.data.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message || "Change Password Fail");
    }
  };

  return (
    <>
      <div className="p-4 background-pass">
        <div className="mt-1 text-center">
                <img src={logo} alt="" className="w-50" />
        </div>
        <div className="form">
          <form
            className="p-4 rounded-4 my-5"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="text my-1">
              <h2>Change Password</h2>
            </div>
                <div className="row">
                  <div className="col-md-11 mt-3 ">
                    {/* Old Password */}
                    <div className="visibilty-password input m-3">
                      <label
                        className="color-text "
                        htmlFor="exampleFormControlInput2"
                      >
                        oldPassword
                      </label>
                      <input
                        id="exampleFormControlInput2"
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
                        id="exampleFormControlInput2"
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
                        id="exampleFormControlInput2"
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
                        placeholder="Confirm New Password"
                        {...register("confirmNewPassword", {
                          required: "confirmNewPassword is required ",
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
