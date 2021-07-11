import { createContext, ReactNode, useCallback, useContext, useState } from "react";
import { setCookie, destroyCookie } from 'nookies';

interface QuestionsProviderProps {
	children: ReactNode;
}

interface QuizData {
	id: string;
	title: string;
	category: string;
	difficulty: string;
	answers: string[];
	correctAnswer: string;
}


interface SelectedAsnwers {
	[key: string]: string;
}


export interface QuestionsContenxtProps {
	handleAddQuantityQuestions: (quantity: string) => void;
	handleResult: (selectedAsnwers: SelectedAsnwers, quizData: QuizData[]) => void;
}

const QuestionsContenxt = createContext<QuestionsContenxtProps>({} as QuestionsContenxtProps);

export function QuestionsProvider({ children }: QuestionsProviderProps) {
	const handleResult = useCallback((selectedAsnwers: SelectedAsnwers, quizData: QuizData[]) => {
		const processedAnswers = Object.entries(selectedAsnwers).map(question => {
			const relatedQuestion = quizData.find(item => item.id === question[0]);
			if (relatedQuestion.correctAnswer === question[1]) {
				return {
					question: relatedQuestion.title,
					selectedAsnwers: question[1],
					correctAnswer: relatedQuestion.correctAnswer,
					isCorret: true
				}
			}

			return {
				question: relatedQuestion.title,
				selectedAsnwers: question[1],
				correctAnswer: relatedQuestion.correctAnswer,
				isCorret: false
			}
		})
		setCookie(null, 'resultQuizData', JSON.stringify(processedAnswers), {
			maxAge: 86400, //1day
			paths: '/',
		})
		destroyCookie(null, 'amountQuestions');
	}, []);


	const handleAddQuantityQuestions = useCallback((amount: string) => {
		setCookie(null, 'amountQuestions', String(amount), {
			maxAge: 86400, //1day
			paths: '/',
		});
	}, [])

	return (
		<QuestionsContenxt.Provider
			value={{
				handleAddQuantityQuestions,
				handleResult,
			}}
		>
			{children}
		</QuestionsContenxt.Provider>
	);
}

export function useQuestions() {
	return useContext(QuestionsContenxt);
}
