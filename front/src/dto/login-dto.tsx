import { UserDto } from "./user-dto";

export interface LoginDto {
  token: string;
  setToken: Function;

  user: UserDto | undefined;

  getHeaders: Function;
  getUserData: Function;
}
