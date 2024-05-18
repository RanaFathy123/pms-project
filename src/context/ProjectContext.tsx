import { PropsWithChildren, createContext, useEffect, useState } from "react";
import { axiosInstanceWithHeaders } from "../axiosConfig/axiosInstance";
import { ProjectContextType } from "../interfaces/ProjectContext";

export const ProjectContext = createContext<ProjectContextType>({
  projectsList: [],
});

function ProjectContextProvider(props: PropsWithChildren) {
  const [projectsList, setProjectsList] = useState([]);

  async function getProjectsList() {
    try {
      let response = await axiosInstanceWithHeaders.get("/Project/manager");
      setProjectsList(response.data.data);
    } catch (error) {}
  }

  useEffect(() => {
    getProjectsList();
  }, []);

  return (
    <ProjectContext.Provider value={{ projectsList }}>
      {props.children}
    </ProjectContext.Provider>
  );
}

export default ProjectContextProvider;
