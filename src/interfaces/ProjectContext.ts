export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
  task: [];
  manager?: {};
}

export interface ProjectContextType {
  projectsList: Project[];
}
