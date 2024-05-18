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
  }
  
  export interface AllUsersContextType {
    allUsersList: AllUsers[];
  }