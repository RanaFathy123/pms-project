import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Avatar from "../../../../assets/images/Ellipse 1.png";
import img1 from "../../../../assets/images/PMS 3.png";
import { axiosInstance } from "../../../../axiosConfig/axiosInstance";
import "../AuthModules.css";

export default function Register() {

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors  },
  } = useForm();
  const Navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);
  const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
  const togglePasswordVisibility = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setIsPasswordShown(!isPasswordShown);
    } else if (field === "confirmPassword") {
      setIsConfirmPasswordShown(!isConfirmPasswordShown);
    }
  };

  // function AppendToFormData(data: any) {
  //   const formData = new FormData();
  //   formData.append("userName", data.userName);
  //   formData.append("profileImage", data.profileImage[0]);
  //   formData.append("email", data.email);
  //   formData.append("phoneNumber", data.phoneNumber);
  //   formData.append("country", data.country);
  //   formData.append("password", data.password);
  //   formData.append("confirmPassword", data.confirmPassword);
  //   return formData;
  // }

  const appendToFormData = (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    return formData;
  };

  function changingImage(event: any) {
    setSelectedImage(URL.createObjectURL(event.target.files[0]));
  }

  async function onSubmit(data: any) {
    let SubmitData = appendToFormData(data);
    try {
      const res: any = await axiosInstance.post(
        `/Users/Register`,
        SubmitData
      );
      toast.success(
        res?.data?.message ||
          "Account created successfully. A verification code has been sent to your email address."
      );
      Navigate("/verify-account");
    } catch (error: any) {
      toast.error(error?.res?.data?.message || "There's an error");
    }
  }

  return (
    <>
      <div className="Auth-container">
        <div className="container-fluid ">
          <div className="row justify-content-center align-items-center min-vh-100">
            <div className="col-md-6 w-75 ">
              <div className="image text-center">
                <img src={img1} alt="" />
              </div>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-5 rounded-4 my-5"
              >
                <div className="text text-white ms-3">
                  <p className="text-Auth">Welcome to PMS</p>
                  <h2>Create New Account</h2>
                </div>
                <div className="row">
                  <div className="col-md-12 text-center position-relative">
                    <div>
                      {selectedImage ? (
                        <div className="">
                          <img
                            src={selectedImage}
                            alt=""
                            className="image-width rounded-circle border-0 "
                          />
                        </div>
                      ) : (
                        <div className="text-center position-relative">
                          <img className="image-width  " src={Avatar} />
                        </div>
                      )}
                      <label
                        htmlFor="image"
                        className="upload position-absolute"
                      >
                        <i className="fa-solid fa-camera fa-lg"></i>
                      </label>
                    </div>

                    <input
                      type="file"
                      accept="image/jpeg , image/png , image/jpg"
                      className="d-none"
                      id="image"
                      {...register("profileImage", {
                        onChange: (e) => changingImage(e),
                      })}
                    />
                  </div>
                  <div className="col-md-6">
                    <div className="input m-3">
                      <label className="my-1">UserName</label>
                      <input
                        type="text"
                        className="form-control p-0"
                        placeholder="Enter Your name"
                        {...register("userName", {
                          required: "Username is required",
                          pattern: {
                            value: /^[a-zA-Z]+[0-9]+$/,
                            message:
                              "Username must contain characters and end with numbers without spaces",
                          },
                          maxLength: { value: 8, message: "Username exceed 8" },
                        })}
                      />
                      {errors?.userName && (
                        <div className="alert alert-danger p-2 my-3">
                          {errors?.userName?.message?.toString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="input m-3">
                      <label className="my-1">Email</label>
                      <input
                        type="email"
                        className="form-control p-0"
                        placeholder="Enter Your E-mail"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value:
                              /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: "Email is invalid",
                          },
                        })}
                      />
                      {errors?.email && (
                        <div className="alert alert-danger p-2 my-3">
                          {errors?.email?.message?.toString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6 ">
                    <div className="input m-3">
                      <label className="my-1">Phone Number</label>
                      <input
                        type="text"
                        className="form-control p-0"
                        placeholder="Enter Your Phone Number"
                        {...register("phoneNumber", {
                          required: "phoneNumber  is required",
                          pattern: {
                            value: /^(01)[0-9]{9}$/,
                            message: "Invalid Egyptian phone number",
                          },
                        })}
                      />
                      {errors?.phoneNumber && (
                        <div className="alert alert-danger p-2 my-3">
                          {errors?.phoneNumber?.message?.toString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="input m-3">
                      <label className="my-1">Country</label>
                      <input
                        type="text"
                        className="form-control p-0"
                        placeholder="Enter Your Country"
                        {...register("country", {
                          required: "country  is required",
                        })}
                      />
                      {errors?.country && (
                        <div className="alert alert-danger p-2 my-3">
                          {errors?.country?.message?.toString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="input m-3 position-relative z-0">
                      <label className="my-1">Password</label>
                      <input
                        type={isPasswordShown ? "text" : "password"}
                        className="form-control p-0 "
                        placeholder="Enter Your Password"
                        {...register("password", {
                          required: "Password is required",
                          pattern: {
                            value:
                              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,}$/,
                            message:
                              "Password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long",
                          },
                        })}
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility("password")}
                        className="bg-transparent border-0"
                      >
                        {isPasswordShown ? (
                          <i className="fa-solid fa-eye-slash position-absolute text-white-50 z-4"></i>
                        ) : (
                          <i className="fa-regular fa-eye position-absolute text-white-50 z-4"></i>
                        )}
                      </button>
                      {errors?.password && (
                        <div className="alert alert-danger p-2 my-3">
                          {errors?.password?.message?.toString()}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6 ">
                    <div className="input m-3 position-relative z-0">
                      <label className="my-1">Confirm Password</label>
                      <input
                        type={isConfirmPasswordShown ? "text" : "password"}
                        className="form-control p-0 "
                        placeholder="Enter Your Confirm Password"
                        {...register("confirmPassword", {
                          required: "Confirm password is required",
                          validate: (value) =>
                            value === watch("password") ||
                            "the passwords dont match ",
                        })}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          togglePasswordVisibility("confirmPassword")
                        }
                        className="toggle-password bg-transparent border-0"
                      >
                        {isConfirmPasswordShown ? (
                          <i className="fa-solid fa-eye-slash position-absolute text-white-50 z-4"></i>
                        ) : (
                          <i className="fa-regular fa-eye position-absolute text-white-50 z-4"></i>
                        )}
                      </button>

                      {errors?.confirmPassword && (
                        <div className="alert alert-danger p-2 my-3 ">
                          {errors?.confirmPassword?.message?.toString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="button">
                  <div className="d-grid gap-2 col-5 mx-auto my-3">
                    <button
          
                      className="btn text-white rounded-pill submit"
                      type="submit"
                    >
                      Save
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
