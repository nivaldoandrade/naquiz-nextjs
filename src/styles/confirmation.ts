import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		height: '100vh',
	},

	content: {
		display: 'flex',
		flexDirection: 'column',
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

	buttonCancel: {
		width: '100%',
		background: 'linear-gradient(120deg, rgba(255, 99, 71, 0.8) 0%, rgb(0, 71, 186) 100%) 0% 0% no-repeat padding-box padding-box transparent',
		color: '#fff',
	},

	buttonStart: {
		width: '100%',
		background: 'linear-gradient(120deg, rgba(77, 129, 213, 0.8) 0%, rgb(0, 71, 186) 100%) 0% 0% no-repeat padding-box padding-box transparent',
		color: '#fff',
	},

	// buttonSubmit: {
	// 	width: 120,
	// 	alignSelf: 'center',
	// 	marginTop: 24,
	// 	color: '#fff',
	// }
}));