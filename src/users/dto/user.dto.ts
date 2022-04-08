import { Role } from "./interfaces";

export class UserDto {
  userId?: number;
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
  role: Role;
}
