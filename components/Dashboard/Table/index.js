import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function BasicTable({map}) {
	return (
		<TableContainer component={Paper}>
			<Table
				sx={{minWidth: 350, minHeight: 115}}
				aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>User</TableCell>
						<TableCell align="left">Team</TableCell>
						<TableCell align="left">Date</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow
						sx={{
							"&:last-child td, &:last-child th": {border: 0},
						}}>
						<TableCell component="th" scope="row">
							{map.name || ""}
						</TableCell>
						<TableCell align="left">{map.team || ""}</TableCell>
						<TableCell align="left">{map.date || ""}</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
}
