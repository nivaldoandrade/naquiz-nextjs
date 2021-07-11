import Head from 'next/head';
import { GetServerSideProps } from 'next';
import { Container, TextField, Paper, Typography, FormControl, Button, Box } from "@material-ui/core";
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as yup from 'yup';
import nookies from 'nookies';

import { CorrectWrongTotalAnswers } from '../utils/correctWrongTotalAnswers';

import { Result } from '../types/result';

import { TableResult } from '../components/TableResult';

import { useQuestions } from '../hooks/useQuestions';

import { Chart } from '../components/Chart';

import { useStyles } from '../styles/home';


const validationSchema = yup.object({
	quantityAnswer: yup.number()
		.required('Campo obrigatório. EX: 2')
		.positive()
		.integer()
		.min(1, 'No minimo 1. EX: 4'),
})

interface Home {
	result: Result[];
}

export default function Home({ result }: Home) {
	const router = useRouter();

	const { handleAddQuantityQuestions } = useQuestions();

	const classes = useStyles();

	const correctWrongTotalAnswers = CorrectWrongTotalAnswers(result);

	const formik = useFormik({
		initialValues: {
			quantityAnswer: '',
		},
		validationSchema: validationSchema,
		onSubmit: values => {
			handleAddQuantityQuestions(values.quantityAnswer);
			router.push('/confirmation')
		}
	})

	return (
		<Container maxWidth="sm" className={classes.container}>
			<Head>
				<title>NaQuiz - Início</title>
			</Head>
			<Paper className={classes.content} >
				<Typography
					className={classes.title}
					variant="h4"
					component="h1"
					color="primary"
					align="center"
					gutterBottom
				>
					NAQUIZ
				</Typography>
				<form
					onSubmit={formik.handleSubmit}
					style={{
						display: 'flex',
						justifyContent: 'center'
					}}
				>
					<FormControl fullWidth variant="outlined" >
						<TextField
							id="quantityAnswer"
							inputProps={{ className: classes.input }}
							variant="filled"
							label="Quantas perguntas?"
							type="number"
							color="secondary"
							onChange={formik.handleChange}
							value={formik.values.quantityAnswer}
							error={formik.touched.quantityAnswer && Boolean(formik.errors.quantityAnswer)}
							helperText={formik.touched.quantityAnswer && formik.errors.quantityAnswer}
						/>
						<Button
							className={classes.buttonSubmit}
							type="submit"
							variant="contained"
							size="large"
						>
							Continuar
						</Button>
					</FormControl>
				</form>
				{result && (
					<Box suppressHydrationWarning style={{ marginTop: 28 }}>
						<Typography
							component="h1"
							variant="subtitle1"
							color="textPrimary"
							gutterBottom
						>
							Resultado do último teste:
					</Typography>
						<Chart
							correct={correctWrongTotalAnswers?.correct}
							wrong={correctWrongTotalAnswers?.wrong}
						/>
						<TableResult result={result} />
					</Box>
				)}
			</Paper>
		</Container >
	)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { resultQuizData } = nookies.get(ctx);

	let result = '';

	if (resultQuizData) {
		result = JSON.parse(resultQuizData)
	}


	return {
		props: { result }
	}
}

