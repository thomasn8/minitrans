import { Element } from "src/elements/entities/element.entity";

export interface UserDto {
	id: number;
	email: string;
	pseudo: string;
	element: string;
}
