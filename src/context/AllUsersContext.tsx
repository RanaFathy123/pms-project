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
  pageSize: [],
  GetTitleValue: () => {},
  GetUserValue: () => {},
  TitleValue: "",
  UserValue: "",
  currentPageNumber: 0,
});
function AllUsersContextProvider(props: PropsWithChildren) {
  const [allUsersList, setAllUsersList] = useState([]);
  const [TitleValue, setTitleValue] = useState("");
  const [UserValue, setIUserValue] = useState("");
  const [pageSize, setPageSize] = useState<number[]>([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(0);
  const { loginData } = useContext(AuthContext);

  async function getUsersList(
    userName: string,
    group: string,
    pageSize: number | string,
    pageNumber: number
  ) {
    try {
      let response = await axiosInstanceWithHeaders.get(
        `/Users?&pageSize=${pageSize}&groups=${group}&pageNumber=${pageNumber}`,
        {
          params: { userName: userName, group: group, pageSize, pageNumber },
        }
      );
      const allUsers = response.data.data;
      setAllUsersList(allUsers);
      const currentPageNumber = response.data.pageNumber;
      setCurrentPageNumber(currentPageNumber);
      setPageSize(
        Array(response.data.totalNumberOfPages)
          .fill(value)
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
    pageSize,
    getUsersList,
    GetTitleValue,
    GetUserValue,
    TitleValue,
    UserValue,
    currentPageNumber,
  };
  return (
    <AllUsersContext.Provider value={value}>
      {props.children}
    </AllUsersContext.Provider>
  );
}
export default AllUsersContextProvider;
