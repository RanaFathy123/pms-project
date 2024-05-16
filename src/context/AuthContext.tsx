import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(null);
//  Context function
export default function AuthContextProvider(props: any) {
  const [loginData, setLoginData] = useState(null);
  const baseUrl = "https://upskilling-egypt.com:3003/api/v1";
  const saveLoginData = () => {
    let encodedData: any = localStorage.getItem("token");
    let decocodedData: any = jwtDecode(encodedData);
    setLoginData(decocodedData);
  };
  useEffect(() => {
    if (localStorage.getItem("token")) {
      saveLoginData();
    }
  }, []);
  return (
    <AuthContext.Provider value={{saveLoginData, loginData,baseUrl}}>
      {props.children}
    </AuthContext.Provider>
  );
}
