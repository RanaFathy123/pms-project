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
  getProjectsList: (
    title: string,
    pageSize: number | string,
    pageNumber: number
  ) => void;
  totalPages:number
  currentPageNumber:number
}
