// Login & Forget Password&Reset  Password
export interface FormData {
    email: string;
    password: string;
    message?: string;
    confirmPassword?: string;
    seed?: string;
  }
  export interface FormDataVerify {
    email: string;
    code: string;
  }
  export interface FormDataRegister {
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    profileImage :File[]
  }  
 
  export interface ChangPass {
    handleClose: () => void;
  }
  
  export  interface FormDataChangPass {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }
 export interface AuthContextType {
    baseUrl?: string;
    loginData?: {} | null;
    saveLoginData?: () => void;
  }
