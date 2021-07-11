import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		alignItems: 'center',
		minHeight: '100vh',
	},

	content: {
		width: '100%',
		margin: '32px 0',
		padding: '32px 24px',
		background: '#fff',
		boxShadow: 'rgb(33 33 33 / 20%) 0px 15px 40px 0px',
		borderRadius: 16,
	},

	title: {
		fontFamily: 'Luckiest Guy',
	},

	input: {
		background: 'rgba(255, 255, 255, 0.6)',
		color: theme.palette.text.primary,
	},

	buttonSubmit: {
		background: 'linear-gradient(120deg, rgba(77, 129, 213, 0.8) 0%, rgb(0, 71, 186) 100%) 0% 0% no-repeat padding-box padding-box transparent',
		boxShadow: 'rgb(73 90 255 / 20%) 10px 10px 20px',
		width: 120,
		alignSelf: 'center',
		marginTop: 24,
		color: '#fff',
	}
}));