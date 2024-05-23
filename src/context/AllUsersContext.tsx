import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { axiosInstanceWithHeaders } from "../axiosConfig/axiosInstance";
import { AllUsersContextType } from "../interfaces/AllUsersContext";
import { AuthContext } from "./AuthContext";

export let AllUsersContext = createContext<AllUsersContextType>({
  allUsersList: [],
});

function AllUsersContextProvider(props: PropsWithChildren) {
  const [allUsersList, setAllUsersList] = useState([]);
  const { loginData } = useContext(AuthContext);
  async function getUsersList() {
    try {
      let response = await axiosInstanceWithHeaders.get("/Users");
      let allUsers = response.data.data;
      setAllUsersList(allUsers);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsersList();
  }, [loginData]);
  return (
    <AllUsersContext.Provider value={{ allUsersList }}>
      {props.children}
    </AllUsersContext.Provider>
  );
}
export default AllUsersContextProvider;
