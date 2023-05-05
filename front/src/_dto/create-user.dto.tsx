export interface QuestionsDto {
	question1: number;
	question2: number;
	question3: number;
	question4: number;
	question5: number;
}

export interface CreateUserDto {
	email: string;
	password: string;
	questions: QuestionsDto;
}
