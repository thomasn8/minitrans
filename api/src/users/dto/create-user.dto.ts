export interface QuestionsDto {
	question1: number,
	question2: number,
	question3: number,
	question4: number,
	question5: number,
}

export class CreateUserDto {
	email: string;
	password: string;
	questions: QuestionsDto;
}
