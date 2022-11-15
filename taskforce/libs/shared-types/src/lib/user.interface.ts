import { UserRole } from './user-role.enum';

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  city: string;
  passwordHash: string;
  role: UserRole;
  avatar?: string;
  birthDate: Date;
}
