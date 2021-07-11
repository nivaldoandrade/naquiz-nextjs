import Head from 'next/head';
import { GetServerSideProps } from "next";
import { Container, Paper, Typography, Button, Grid } from "@material-ui/core";
import Link from 'next/link';
import nookies from 'nookies';

import { useStyles } from '../../styles/confirmation';

interface ConfirmationProps {
	amountQuestions: string;
}


export default function Confirmation({ amountQuestions }: ConfirmationProps) {
	const classes = useStyles();

	return (
		<Container className={classes.container} maxWidth="sm" >
			<Head>
				<title>NaQuiz - Confirmação</title>
			</Head>
			<Paper elevation={0} className={classes.content}>
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
				<Typography
					variant="subtitle1"
					color="secondary"
					align="center"
					gutterBottom
				>
					Voce escolheu <strong >{amountQuestions} </strong>
					{Number(amountQuestions) === 1 ? 'questão' : 'questões'},
					deseja continuar?
				</Typography>
				<Grid container spacing={2}>
					<Grid item xs={12} sm={6}>
						<Link href="/questions" passHref replace>
							<Button
								className={classes.buttonStart}
								type="submit"
								variant="contained"
								size="large"
								href="/questions"
							>
								Start
							</Button>
						</Link>
					</Grid>
					<Grid item xs={12} sm={6}>
						<Link href="/" passHref>
							<Button
								className={classes.buttonCancel}
								type="submit"
								variant="contained"
								size="large"
							>
								Cancelar
							</Button>
						</Link>
					</Grid>
				</Grid>
			</Paper>
		</Container >
	)
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const { amountQuestions } = nookies.get(ctx);

	return {
		props: { amountQuestions }
	}
}
