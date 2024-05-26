import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../../../../src/assets/images/PMS 3.png";
import { axiosInstance } from "../../../../axiosConfig/axiosInstance";
import "./ResetPassword.css";

export default function ResetPassword() {

  const [otpVisible, setOtpVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const toggelOtpIcon = () => {
    setOtpVisible(!otpVisible);
  };
  const toggelPasswordIcon = () => {
    setPasswordVisible(!passwordVisible);
  };
  const toggelConfirmIcon = () => {
    setConfirmVisible(!confirmVisible);
  };
  const onSubmit = async (data: any) => {
    try {
      let respons = await axiosInstance.post(
        `/Users/Reset`,
        data
      );
      toast.success(respons.data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      <div className={`Auth-container`}>
        <div className="container ">
          <div className="row justify-content-center align-items-center vh-100 overflow-y-hidden ">
            <div className="col-lg-6 col-md-8 col-sm-10   ">
              <div className="image w-50 m-auto">
                <img src={logo} alt="Logo" className="w-100" />
              </div>
              <div className={`w-100`}>
                <form
                  className="p-5 rounded-4 my-3"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="text text-white ms-3">
                    <p className="text-Auth">Welcome to PMS</p>
                    <h2>Reset Password</h2>
                  </div>
                  {/* email */}
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
                  {/* otp */}
                  <div className="input m-3 visibilty-password">
                    <label
                      className="color-text"
                      htmlFor="exampleFormControlInput2"
                    >
                      OTP Verification
                    </label>
                    <br />
                    <input
                      type={otpVisible ? "text" : "password"}
                      id="exampleFormControlInput2"
                      className="form-control p-4 shadow-none"
                      placeholder="Enter Verification"
                      {...register("seed", {
                        required: "OTP Is Required",
                        maxLength: {
                          value: 4,
                          message: "OTP must be max 4 characters",
                        },
                      })}
                    />
                    <i
                      className={`toggle-password-icon z-4 ${
                        otpVisible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                      }`}
                      onClick={toggelOtpIcon}
                    ></i>
                  </div>
                  {errors?.seed && (
                    <p className="alert alert-warning p-2 mx-2">
                      {errors?.seed?.message?.toString()}
                    </p>
                  )}
                  {/* password */}
                  <div className="input m-3 visibilty-password">
                    <label
                      className="color-text"
                      htmlFor="exampleFormControlInput3"
                    >
                      New Password
                    </label>
                    <br />
                    <input
                      type={passwordVisible ? "text" : "password"}
                      id="exampleFormControlInput3"
                      className="form-control p-4 shadow-none"
                      placeholder="Enter New Password"
                      {...register("password", {
                        required: " password Is Required",
                        maxLength: {
                          value: 10,
                          message: "Password must be max 10 characters",
                        },
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                          message:
                            "Password must contain at least 8 characters, including upper and lowercase letters, and numbers",
                        },
                      })}
                    />
                    <i
                      className={`toggle-password-icon z-4 ${
                        passwordVisible
                          ? "fa-solid fa-eye"
                          : "fa-solid fa-eye-slash"
                      }`}
                      onClick={toggelPasswordIcon}
                    ></i>
                  </div>
                  {errors?.password && (
                    <p className="alert alert-warning p-2 mx-2">
                      {errors?.password?.message?.toString()}
                    </p>
                  )}
                  {/* confirmPassword */}
                  <div className="input m-3 visibilty-password ">
                    <label
                      className="color-text"
                      htmlFor="exampleFormControlInput4"
                    >
                      Confirm Password
                    </label>
                    <br />
                    <input
                      type={confirmVisible ? "text" : "password"}
                      
                      id="exampleFormControlInput4"
                      className="form-control p-4 shadow-none"
                      placeholder="Enter Confirm Password"
                      {...register("confirmPassword", {
                        required: "confirm Password Is Required",
                        maxLength: {
                          value: 10,
                          message: "confirm Password must be max 10 characters",
                        },
                        pattern: {
                          value:
                            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
                          message:
                            "Password must contain at least 8 characters, including upper and lowercase letters, and numbers",
                        },
                        validate: (value) =>
                          value === watch("password") ||
                          "confirm Password not match ",
                      })}
                    />
                    <i
                      className={`toggle-password-icon  z-4 ${
                        confirmVisible
                          ? "fa-solid fa-eye"
                          : "fa-solid fa-eye-slash"
                      }`}
                      onClick={toggelConfirmIcon}
                    ></i>
                  </div>
                  {errors?.confirmPassword && (
                    <p className="alert alert-warning p-2 mx-2">
                      {errors?.confirmPassword?.message?.toString()}
                    </p>
                  )}
                  <div className="button">
                    <div className="d-grid gap-2 col-5 mx-auto my-3">
                      <button
                        className="btn text-white rounded-pill submit"
                        type="submit"
                      >
                        Rest
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
