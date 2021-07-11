import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import {
	Container, Paper, Typography, FormControlLabel, Radio, FormControl, Button, RadioGroup, CircularProgress
} from '@material-ui/core';
import { useFormik, } from 'formik';
import nookies from 'nookies';
import Router from 'next/router';

import { opentdb } from '../../services/opentdb'

import { useQuestions } from '../../hooks/useQuestions';

import { useStyles } from '../../styles/questions';

interface ResponseQuestion {
	results: {
		category: string;
		difficulty: string;
		question: string;
		correct_answer: string;
		incorrect_answers: string[];
	}[]
}

interface QuestionsProps {
	quizData: {
		id: string;
		title: string;
		category: string;
		difficulty: string;
		answers: string[];
		correctAnswer: string;
	}[]
	amount: string;
}

interface FormValues {
	initialValues: string;
	[key: string]: string;
}

export default function Questions({ quizData, amount }: QuestionsProps) {
	const { handleResult } = useQuestions();

	useEffect(() => {
		window.addEventListener('pageshow', () => {
			Router.replace('/')
		})
	}, [])


	const [initialValues, setInitialValues] = useState({});
	const classes = useStyles();

	useEffect(() => {
		quizData.forEach(item => {
			setInitialValues(state => ({ ...state, [item.id]: '' }))
		})
	}, [quizData])

	const formik = useFormik({
		initialValues: { initialValues },
		onSubmit: values => {
			const { ['initialValues']: remove, ...valuesFormatted } = values as FormValues;

			handleResult(valuesFormatted, quizData);
			Router.replace('/result');
		}
	});

	return (
		<Container maxWidth="md" className={classes.container}>
			<Head>
				<title>NaQuiz - Questṍes</title>
			</Head>
			<Paper elevation={0} className={classes.content}>
				<header className={classes.headerContent}>
					<Typography className={classes.logo} variant="h5" component="p" color="primary" >
						NAQUIZ
					</Typography>
					<Typography variant="subtitle1" component="p" color="textPrimary">
						{Number(amount) === 1 ? `${amount} Questão` : `${amount} Questões`}
					</Typography>
				</header>
				<form onSubmit={formik.handleSubmit}>
					<FormControl className={classes.formControl}>
						{quizData?.map(item => (
							<div className={classes.answerContent} key={item.id}>
								<div>
									<div
										className={classes.titleAnswer}
										dangerouslySetInnerHTML={{ __html: item.title }}
									/>
									<div className={classes.questionInfo}>
										<Typography variant="caption" color="textPrimary">
											<strong>Categoria:</strong> {item.category}
										</Typography>
										<Typography variant="caption" color="textPrimary">
											<strong>Dificuldade:</strong> {item.difficulty}
										</Typography>
									</div>
								</div>
								<RadioGroup
									name={item.id}
									value={formik.values.initialValues[item.id]}
									onChange={formik.handleChange}
								>
									{item.answers.map(answer => (
										<FormControlLabel

											key={answer}
											value={answer}
											control={<Radio color="primary" />}
											label={
												<div
													className={classes.answer}
													dangerouslySetInnerHTML={{ __html: answer }}
												/>
											}
										/>
									))}
								</RadioGroup>
							</div>
						))}
						<Button
							type="submit"
							size="large"
							className={classes.buttonSubmit}
						>
							finalizar
						</Button>
					</FormControl>
				</form>
			</Paper>
		</Container>
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { amountQuestions: amount } = nookies.get(ctx);

	const response = await opentdb.get<ResponseQuestion>('api.php', {
		params: {
			amount
		}
	});

	const quizData = response.data.results.map((question, index) => {
		const incorrectAnswerIndex = question.incorrect_answers.length;
		const randomIndex = Math.round(
			Math.random() * (incorrectAnswerIndex - 0) + 0
		)

		question.incorrect_answers.splice(randomIndex, 0, question.correct_answer);

		return {
			id: `question${index + 1}`,
			title: question.question,
			category: question.category,
			difficulty: question.difficulty,
			answers: question.incorrect_answers,
			correctAnswer: question.correct_answer
		}
	})

	return {
		props: {
			quizData,
			amount
		}
	}
}


