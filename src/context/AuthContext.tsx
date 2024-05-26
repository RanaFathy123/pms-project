import { jwtDecode } from "jwt-decode";
import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { AuthContextType } from "../interfaces/Auth";

export const AuthContext = createContext<AuthContextType>({
  baseUrl: "",
  loginData: {
    userId: "" || 0,
    userName: "",
    userEmail: "",
    userGroup: "",
  },
  saveLoginData: () => {},
  resetLoginData:()=>{}
});
//  Context function
export default function AuthContextProvider(props: PropsWithChildren) {
  const [loginData, setLoginData] = useState(null);

  const baseUrl = "https://upskilling-egypt.com:3003/api/v1";
  const saveLoginData = () => {
    let encodedData: any = localStorage.getItem("token");
    let decocodedData: any = jwtDecode(encodedData);
    setLoginData(decocodedData);
  };
  const resetLoginData =()=>{
    setLoginData(null)
  }
  // call saveLogin data
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);
  const value = { saveLoginData, loginData, baseUrl,resetLoginData };
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}
