import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { axiosInstanceWithHeaders } from "../axiosConfig/axiosInstance";
import { UsersContextType } from "../interfaces/UserContext";

export let UsersContext = createContext<UsersContextType>({
  usersList: [],
});

function UsersContextProvider(props: PropsWithChildren) {
  const [usersList, setUsersList] = useState([]);

  async function getUsersList() {
    try {
      let response = await axiosInstanceWithHeaders.get("/Users/Manager");
      setUsersList(response.data.data);
    } catch (error) {}
  }

  useEffect(() => {
    getUsersList();
  }, []);
  return (
    <UsersContext.Provider value={{ usersList }}>
      {props.children}
    </UsersContext.Provider>
  );
}
export default UsersContextProvider