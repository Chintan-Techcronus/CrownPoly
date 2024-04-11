export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    pin?: string;
    roleId?: number;
    roleName?: string;
    isActive?: boolean;
    prodLines: ProdLine[];
    prodLineNames?:string;
  }

  export interface ProdLine {
    id: number;
    name: string;
    Name: string;
  }
 

  export interface Users {
    id?: number;
    firstName: string;
    lastName: string;
    pin?: string;
    roleId?: number;
    roleName?: string;
    isActive?: boolean;
    prodLine?: string;
  }




  
 
