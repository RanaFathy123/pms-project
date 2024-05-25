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
  getUsersList: () => {},
  allUsersList: [],
  toggle: () => {},
  pageSize: [],
  GetTitleValue: () => {},
  GetUserValue: () => {},
});
function AllUsersContextProvider(props: PropsWithChildren) {
  const {loginData} = useContext(AuthContext)

  const [allUsersList, setAllUsersList] = useState([]);
  const [isToggle, setIsToggle] = useState(false);
  const [TitleValue, setTitleValue] = useState("");
  const [UserValue, setIUserValue] = useState("");
  const [pageSize, setPageSize]: any = useState([]);

  const toggle = () => {
    setIsToggle(!isToggle);
  };
  async function getUsersList(
    userName: any,
    group: any,
    pageSize: any,
    pageNumber: any
  ) {
    try {
      let response = await axiosInstanceWithHeaders.get(
        `/Users?&pageSize=${pageSize}&groups=${group}&pageNumber=${pageNumber}`,
        {
          params: { userName: userName, group: group, pageSize, pageNumber },
        }
      );
      setAllUsersList(response?.data?.data);
      setPageSize(
        Array(response?.data?.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
    } catch (error) {}
  }

  const GetTitleValue = (input: any) => {
    setTitleValue(input.target.value);
    getUsersList(input.target.value, UserValue, 5, 1);
  };

  const GetUserValue = (input: any) => {
    setIUserValue(input.target.value);
    getUsersList(TitleValue, input.target.value, 5, 1);
  };
  useEffect(() => {
    getUsersList("", "", 5, 1);
  }, [loginData]);

  const value = {
    allUsersList,
    toggle,
    pageSize,
    getUsersList,
    GetTitleValue,
    GetUserValue,
    TitleValue,
    UserValue,
  };
  return (
    <AllUsersContext.Provider value={value}>
      {props.children}
    </AllUsersContext.Provider>
  );
}
export default AllUsersContextProvider;
