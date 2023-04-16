import { UserDto } from "./user-dto";

export interface LoginDto {
  token: string;
  setToken: Function;

  user: UserDto | undefined;

  get_headers: Function;
  getUserData: Function;
}
