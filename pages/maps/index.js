import Dashboard from "../../components/Dashboard";
import React, {useEffect} from "react";
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

	return (
		<main>
			<Dashboard data={maps} onRouteChange={onRouteChange} />
			<CustomModal />
		</main>
	);
}
