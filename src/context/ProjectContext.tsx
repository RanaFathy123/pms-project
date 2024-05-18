import axios from "axios";
import { PropsWithChildren, createContext, useState } from "react";

export const ProjectContext = createContext(null);

function ProjectContextProvider(props: PropsWithChildren) {
  const [projects, setProjects] = useState([]);
  const getProjectsForManger = async () => {
    const response = axios.get("");
  };
}

export default ProjectContextProvider;
