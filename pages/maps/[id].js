import React, {useEffect, useState} from "react";
import Canvas from "../../components/Canvas";
import "reactflow/dist/style.css";
// import Filter from "../../components/Canvas/FilterData";
import {CircularProgress} from "@mui/material";
import {useRouter} from "next/router";
import useSWR from "swr";

export default function MapDetailsPage() {
	const [filter, setFilter] = useState("HTML");
	const router = useRouter();
	const {
		query: {id},
	} = router;

	if (!router.isReady) return <CircularProgress />;

	return (
		<main style={{height: `calc(100vh - 250px)`}}>
			<h2>mapname</h2>
			<Canvas id={id} filter={filter} />
		</main>
	);
}
