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
  // call saveLogin data
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        saveLoginData,
        loginData,
        baseUrl,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
