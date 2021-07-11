import { Result } from '../types/result';

interface CorrectWrongTotalAnswers {
	correct: number;
	wrong: number;
	total: number;
}

export function CorrectWrongTotalAnswers(result: Result[]) {
	if (!result) {
		return;
	}

	const correctWrongTotalAnswers: CorrectWrongTotalAnswers =
		result.reduce((accumulator, item) => {
			if (item.isCorret) {
				return {
					...accumulator,
					correct: accumulator.correct + 1,
					total: accumulator.total + 1,
				}
			}

			return {
				...accumulator,
				wrong: accumulator.wrong + 1,
				total: accumulator.total + 1,
			}

		}, { correct: 0, wrong: 0, total: 0 }
		)

	return correctWrongTotalAnswers;
}


