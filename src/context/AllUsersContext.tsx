import { PropsWithChildren, createContext, useEffect, useState } from "react";

import { axiosInstanceWithHeaders } from "../axiosConfig/axiosInstance";
import { AllUsersContextType } from "../interfaces/AllUsersContext";

export let AllUsersContext = createContext<AllUsersContextType>({
  allUsersList: [],
});

function AllUsersContextProvider(props: PropsWithChildren) {
  const [allUsersList, setAllUsersList] = useState([]);
  async function getUsersList() {
    try {
      let response = await axiosInstanceWithHeaders.get("/Users");
      setAllUsersList(response.data.data);
    } catch (error) {}
  }

  useEffect(() => {
    getUsersList();
  }, []);
  return (
    <AllUsersContext.Provider value={{ allUsersList }}>
      {props.children}
    </AllUsersContext.Provider>
  );
}
export default AllUsersContextProvider

