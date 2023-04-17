import Dashboard from "../../components/Dashboard";
import React, {useEffect, useState} from "react";
import CustomModal from "../../components/Modal";
import useStore from "../../store";
import {shallow} from "zustand/shallow";

const selector = (state) => {
	return {
		maps: state.maps,
		map: state.map,
		fetchMap: state.fetchMap,
		fetchMaps: state.fetchMaps,
		deleteMap: state.deleteMap,
		nodes: state.nodes,
		edges: state.edges,
		loading: state.loading,
	};
};

export default function MapsPage() {
	const {maps, fetchMap, fetchMaps, deleteMap, map, nodes, edges, loading} =
		useStore(selector, shallow);
	const [selectedItem, setSelectedItem] = useState(null);
	function handleMapSelect(item, id) {
		fetchMap(id);
		setSelectedItem(item);
	}

	useEffect(() => {
		fetchMaps();
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
				handleDelete={deleteMap}
				isloading={loading}
			/>
			<CustomModal />
		</main>
	);
}
