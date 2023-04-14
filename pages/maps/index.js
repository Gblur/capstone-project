import Dashboard from "../../components/Dashboard";
import React, {useState, useEffect} from "react";
import {CircularProgress} from "@mui/material";
import {useRouter} from "next/router";
import CustomModal from "../../components/Modal";
import useStore from "../../store";

export default function MapsPage() {
	const fetch = useStore((state) => state.getData);
	const maps = useStore((state) => state.maps);
	const router = useRouter();
	function onRouteChange(id) {
		router.push(`maps/${id}`);
	}

	useEffect(() => {
		fetch();
		return () => {};
	}, []);

	if (!maps.length) return <CircularProgress />;

	return (
		<main>
			<Dashboard data={maps} onRouteChange={onRouteChange} />
			<CustomModal />
		</main>
	);
}
