import React, {useEffect, useState} from "react";
import Canvas from "../../../components/Canvas";
import "reactflow/dist/style.css";
// import Filter from "../../components/Canvas/FilterData";
import {CircularProgress} from "@mui/material";
import {useRouter} from "next/router";
import useStore from "../../../store";

export default function MapDetailsPage() {
	const [filter, setFilter] = useState("HTML");
	const map = useStore((state) => state.map);
	const router = useRouter();
	const {
		query: {id},
	} = router;

	if (!router.isReady) return <CircularProgress />;

	return (
		<main style={{height: `calc(100vh - 250px)`}}>
			<h2>{map.name}</h2>
			<p>{map.description}</p>
			<Canvas map={map} id={id} filter={filter} />
		</main>
	);
}
