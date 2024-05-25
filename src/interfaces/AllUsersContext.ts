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
    pageNumber: number,
    pageSize: [],
    totalNumberOfRecords: number,
    totalNumberOfPages: number
  }
  
  export interface AllUsersContextType {
    allUsersList: AllUsers[];
    toggle:()=>void
    getUsersList:( TitleValue:any, UserValue:any ,pageSize:any, pageNumber:any)=> void
    pageSize: [],
    GetTitleValue:(input:any)=>void,
    GetUserValue:(input:any)=>void


  }