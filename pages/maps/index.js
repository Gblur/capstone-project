import Dashboard from "../../components/Dashboard";
import React, {useState, useEffect} from "react";
import Modal from "../../components/Modal";
import ProjectForm from "../../components/Form";
import {CircularProgress} from "@mui/material";
import {useRouter} from "next/router";
import CustomModal from "../../components/Modal";

export default function MapsPage() {
	const router = useRouter();
	const [data, setData] = useState();

	async function getData() {
		const response = await fetch("/api/maps");
		const data = await response.json();
		setData(data);
	}

	function onRouteChange(id) {
		router.push(`maps/${id}`);
	}

	useEffect(() => {
		getData();
		return () => {};
	}, []);

	if (!data) return <CircularProgress />;

	return (
		<main>
			<Dashboard data={data} onRouteChange={onRouteChange} />
			<CustomModal />
		</main>
	);
}
