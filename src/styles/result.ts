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
		justifyContent: 'center',
		marginBottom: 24,
	},

	logo: {
		fontFamily: 'Luckiest Guy',
		transform: 'translateY(4px)',
		textDecoration: 'none',
	},
}))