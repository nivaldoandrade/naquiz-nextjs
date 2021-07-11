import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
	container: {
		margin: '32px auto',
	},

	content: {
		display: 'flex',
		flexDirection: 'column',
		padding: '32px 24px',
		background: '#fff',
		boxShadow: 'rgb(33 33 33 / 20%) 0px 15px 40px 0px',
		borderRadius: 16,
	},

	headerContent: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	logo: {
		fontFamily: 'Luckiest Guy',
		transform: 'translateY(4px)',
	},

	formControl: {
		width: '100%',
		marginTop: 32,
	},

	answerContent: {
		'& + div': {
			marginTop: 24,
		}
	},

	titleAnswer: {
		fontSize: 20,
		fontWeight: 'bold',
	},

	answer: {
		fontSize: 16
	},

	questionInfo: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		gap: 8,
	},

	buttonSubmit: {
		// width: 120,
		// alignSelf: 'flex-end',
		color: '#fff',
		marginTop: 24,
		background: 'linear-gradient(120deg, rgba(77, 129, 213, 0.8) 0%, rgb(0, 71, 186) 100%) 0% 0% no-repeat padding-box padding-box transparent',
		boxShadow: 'rgb(73 90 255 / 20%) 10px 10px 20px',
	},
}));