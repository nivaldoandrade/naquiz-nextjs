import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

export const theme = createMuiTheme({
	overrides: {
		MuiCssBaseline: {
			'@global': {
				body: {
					background: 'linear-gradient(0deg, rgba(77,129,213,1) 0%, rgba(0,71,186,1) 50%)',
					backgroundRepeat: "no-repeat",
					backgroundAttachment: "fixed",
				},
			},
		},
	},

	palette: {
		primary: {
			main: 'rgb(0, 71, 186)',
		},
		secondary: {
			main: 'rgba(77,129,213,1)',
		},
		text: {
			primary: 'rgb(100, 100, 100)',
			secondary: 'rgba(77,129,213,1)',
		},
		error: {
			main: red.A400,
		}
	},
});

