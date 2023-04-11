import {MenuItem, Select} from "@mui/material";
import React from "react";

export default function Filter({setFilterValue, first, second, third, id}) {
	function handleFilter(event) {
		setFilterValue(event.target.value);
	}

	return (
		<Select id={id} defaultValue={first} onChange={handleFilter}>
			<MenuItem value={first}>{first}</MenuItem>
			<MenuItem value={second}>{second}</MenuItem>
			<MenuItem value={third}>{third}</MenuItem>
		</Select>
	);
}
