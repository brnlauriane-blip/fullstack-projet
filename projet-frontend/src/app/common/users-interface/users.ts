import { UserTypes } from '../user-types-interface/user-types';

export interface Users {
  id?: number;
  lastName: string;
  firstName: string;
  email: string;
  userTypeId?: number; 
  userTypes?: UserTypes;
  userTypeName?: string; 
}
