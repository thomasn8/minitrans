import { UserDto } from "./user-dto";

export interface LoginDto {
	id: number;
	email: string;
	pseudo: string;
	element: string;
}
