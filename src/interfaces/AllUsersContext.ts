export interface AllUsers {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string;
  isActivated: Boolean;
  creationDate: string;
  modificationDate: string;
  pageNumber: number;
  pageSize: number[];
  totalNumberOfRecords: number;
  totalNumberOfPages: number;
}

export interface AllUsersContextType {
  allUsersList: AllUsers[];
  getUsersList: (
    TitleValue: string,
    UserValue: string,
    pageSize: number | string,
    pageNumber: number
  ) => void;
  pageSize: number[];
  GetTitleValue: (input: any) => void;
  GetUserValue: (input: any) => void;
  TitleValue: string;
  UserValue: string;
  currentPageNumber: number;
}
