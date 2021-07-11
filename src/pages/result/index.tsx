import Head from 'next/head';
import { Container, Grid, Paper, Typography } from '@material-ui/core';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import nookies from 'nookies';

import { CorrectWrongTotalAnswers } from '../../utils/correctWrongTotalAnswers';
import { Result as ResultData } from '../../types/result';

import { TableResult } from '../../components/TableResult';
import { Chart } from '../../components/Chart';

import { useStyles } from '../../styles/result';


interface CorrectWrongTotalAnswers {
	correct: number;
	wrong: number;
	total: number;
}

interface ResultProps {
	result: ResultData[];
}

export default function Result({ result }: ResultProps) {
	const classes = useStyles();

	const correctWrongTotalAnswers = CorrectWrongTotalAnswers(result);

	return (
		<Container maxWidth="md" className={classes.container}>
			<Head>
				<title>NaQuiz - Resultado</title>
			</Head>
			<Paper elevation={0} className={classes.content}>
				<header className={classes.headerContent}>
					<Link href="/" passHref>
						<Typography
							className={classes.logo}
							variant="h5"
							component="a"
							color="primary"
						>
							NAQUIZ
						</Typography>
					</Link>
				</header>
				<Grid container spacing={2} justify="space-around" alignItems="center">
					<Grid item >
						<Typography
							component="h1"
							variant="h4"
							align="center"
							style={{
								fontWeight: 'bold',
							}}
						>
							Você acertou:
						</Typography>
						<Typography
							variant="h6"
							align="center"
							color="primary"
						>
							<strong style={{ fontSize: 64 }}>
								{correctWrongTotalAnswers?.correct}/
							</strong>
							{correctWrongTotalAnswers?.total}
						</Typography>

					</Grid>
					<Grid item >
						<Chart
							correct={correctWrongTotalAnswers?.correct}
							wrong={correctWrongTotalAnswers?.wrong}
						/>
					</Grid>
				</Grid>
				<TableResult result={result} />
			</Paper>
		</Container >
	);
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { resultQuizData } = nookies.get(ctx);

	const result = JSON.parse(resultQuizData);

	return {
		props: { result }
	}
}