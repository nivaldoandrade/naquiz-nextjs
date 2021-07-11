import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import dynamic from 'next/dynamic';

import { Result } from '../../types/result';

const RowDynamic = dynamic(() => import('./TableRow'));


interface TableResultProps {
	result: Result[];
}

export function TableResult({ result }: TableResultProps) {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="collapsible table">
				<TableHead>
					<TableRow>
						<TableCell />
						<TableCell>Questões</TableCell>
						<TableCell align="center">Resultados</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{result?.map((item: Result) => (
						<RowDynamic key={item.question} item={item} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}