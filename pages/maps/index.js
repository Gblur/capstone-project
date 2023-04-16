import Dashboard from "../../components/Dashboard";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import CustomModal from "../../components/Modal";
import useStore from "../../store";
import {shallow} from "zustand";

const selector = (state) => {
	return {
		maps: state.maps,
		map: state.map,
		fetchMap: state.fetchMap,
		fetchMaps: state.fetchMaps,
		nodes: state.nodes,
		edges: state.edges,
	};
};

export default function MapsPage() {
	const {maps, fetchMap, fetchMaps, map, nodes, edges} = useStore(
		selector,
		shallow
	);
	const [selectedItem, setSelectedItem] = useState(null);
	function handleMapSelect(item, id) {
		fetchMap(id);
		setSelectedItem(item);
	}

	console.log(nodes);

	useEffect(() => {
		fetchMaps();
		return () => {};
	}, []);

	return (
		<main>
			<Dashboard
				data={maps}
				map={map}
				nodes={nodes}
				edges={edges}
				selectedItem={selectedItem}
				handleMapSelect={handleMapSelect}
			/>
			<CustomModal />
		</main>
	);
}
