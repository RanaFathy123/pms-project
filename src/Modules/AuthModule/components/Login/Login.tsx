import logo from "../../../../assets/images/PMS 3.svg";
import "./Login.css";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { FormData } from "../../../../interfaces/Auth.ts";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../../../../context/AuthContext.tsx";

// Function
export default function Login() {
  const { baseUrl, saveLoginData } = useContext(AuthContext);

  const navigate = useNavigate();

  // useForm
  // FormData : interface (Auth.ts)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  // Password eye
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = (): void => {
    setShowPassword((prevState: boolean) => !prevState);
  };

  // Send Data to Api
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(`${baseUrl}/Users/Login`, data);
      localStorage.setItem("token", response.data.token);
      toast.success("Login Success", response.data.message);
      saveLoginData();
      navigate("/dashboard");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login Fail");
    }
  };

  return (
    <>
      <div className="Auth-container">
        <div className="container-fluid ">
          <div className="row min-vh-100  justify-content-center align-items-center">
            <div className="w-50">
              <div className="mt-5 text-center">
                <img src={logo} alt="" />
              </div>
              <form
                className="p-4 rounded-4 my-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="text  ms-3">
                  <p className="text-Auth text-white">Welcome to PMS</p>
                  <h2>Login</h2>
                </div>
                <div className="row">
                  <div className="col-md-11 mt-3 ">
                    {/* Email */}
                    <div className="input m-3">
                      <label
                        className="color-text"
                        htmlFor="exampleFormControlInput1"
                      >
                        Email
                      </label>
                      <input
                        {...register("email", {
                          required: "email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "email is not valid ",
                          },
                        })}
                        placeholder="email"
                        id="exampleFormControlInput1"
                        type="email"
                        className="form-control p-4 shadow-none"
                      />
                      <div className="border_bottom"></div>
                    </div>
                    {errors.email && (
                      <div className="alert alert-warning p-2 mx-2">
                        {errors.email.message}
                      </div>
                    )}

                    {/* Password */}
                    <div className="visibilty-password input m-3">
                      <label
                        className="color-text "
                        htmlFor="exampleFormControlInput2"
                      >
                        password
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
                          color: showPassword ? "white" : "",
                        }}
                        placeholder="password"
                        {...register("password", {
                          required: "password is required ",
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
                    {errors.password && (
                      <div className="alert alert-warning p-2 mx-2">
                        {errors.password.message}
                      </div>
                    )}
                  </div>
                </div>

                <div className="Linkes d-flex justify-content-between my-3">
                  <NavLink
                    className=" text-white ms-3 text-decoration-none"
                    to="/register"
                  >
                    Register Now?
                  </NavLink>
                  <NavLink
                    className=" text-white me-5 text-decoration-none"
                    to="/forget-pass"
                  >
                    Forgot Password?
                  </NavLink>
                </div>
                <div className="button mt-4">
                  <div className="d-grid gap-2 col-md-9   mx-auto my-3">
                    <button
                      type="submit"
                      className="btn text-white rounded-pill submit p-3"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
