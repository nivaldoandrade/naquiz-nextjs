import { useState, Fragment } from "react";
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TableCell from '@material-ui/core/TableCell';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

interface Question {
	isCorret: boolean;
	question: string;
	selectedAsnwers: string;
	correctAnswer: string | boolean;
}

interface RowProps {
	item: Question;
}

export default function Row({ item }: RowProps) {
	const [open, setOpen] = useState(false);

	return (
		<Fragment>
			<TableRow>
				<TableCell>
					<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				<TableCell component="th" scope="row">
					<div dangerouslySetInnerHTML={{ __html: item.question }} />
				</TableCell>
				<TableCell align="center">
					{item.isCorret
						? <InsertEmoticonIcon />
						: <SentimentVeryDissatisfiedIcon />
					}
				</TableCell>
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout="auto" unmountOnExit>
						<Box margin={1} >
							<Typography variant="subtitle1" gutterBottom component="div">
								<strong>Resposta Selecionada:</strong>
								<div dangerouslySetInnerHTML={{ __html: item.selectedAsnwers }} />
							</Typography>
							<Typography variant="subtitle1" gutterBottom component="div">
								<strong>Resposta Correta:</strong>
								<div dangerouslySetInnerHTML={{ __html: String(item.correctAnswer) }} />
							</Typography>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</Fragment>
	)
}
