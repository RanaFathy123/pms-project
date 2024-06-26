import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { axiosInstanceWithHeaders } from "../axiosConfig/axiosInstance";
import { ProjectContextType } from "../interfaces/ProjectContext";
import { AuthContext } from "./AuthContext";

export const ProjectContext = createContext<ProjectContextType>({
  projectsList: [],
  getProjectsList: () => {},
  totalPages: 0,
  currentPageNumber:1
});

function ProjectContextProvider(props: PropsWithChildren) {
  const [projectsList, setProjectsList] = useState([]);
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { loginData } = useContext(AuthContext);
  const title = new URLSearchParams(window.location.search).get("title") || "";
  async function getProjectsList(
    title: string,
    pageSize: number | string,
    pageNumber: number
  ) {
    try {
      let response = await axiosInstanceWithHeaders({
        method: "get",
        url:
          loginData?.userGroup == "Manager"
            ? `/Project/manager/?title=${title}&pageSize=${pageSize}&pageNumber=${pageNumber}`
            : `/Project/employee/?title=${title}&pageSize=${pageSize}&pageNumber=${pageNumber}`,
      });
      console.log(response.data.totalNumberOfPages);
      const totalPages = response.data.totalNumberOfPages;
      setTotalPages(totalPages);
      const currentPage = response.data.pageNumber;
      setCurrentPageNumber(currentPage);
      const projects = response.data.data;
      setProjectsList(projects);
    } catch (error) {}
  }
  useEffect(() => {
    const title =
      new URLSearchParams(window.location.search).get("title") || "";
    if (title == "") {
      getProjectsList("", 7, currentPageNumber);
    } else {
      getProjectsList(title, 7, currentPageNumber);
    }
  }, [loginData, title,currentPageNumber]);

  return (
    <ProjectContext.Provider
      value={{ projectsList, getProjectsList, totalPages,currentPageNumber}}
    >
      {props.children}
    </ProjectContext.Provider>
  );
}

export default ProjectContextProvider;
