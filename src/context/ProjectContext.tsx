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
});

function ProjectContextProvider(props: PropsWithChildren) {
  const [projectsList, setProjectsList] = useState([]);
  const { loginData } = useContext(AuthContext);

  async function getProjectsList() {
    try {
      let response = await axiosInstanceWithHeaders.get("/Project/manager");
      const projects = response.data.data;
      setProjectsList(projects);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProjectsList();
  }, [loginData]);

  return (
    <ProjectContext.Provider value={{ projectsList, getProjectsList }}>
      {props.children}
    </ProjectContext.Provider>
  );
}

export default ProjectContextProvider;
