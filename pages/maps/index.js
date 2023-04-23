import Dashboard from "../../components/Dashboard";
import React, {useEffect, useState, useRef} from "react";
import CustomModal from "../../components/Modal";
import ProjectForm from "../../components/Form";
import useStore from "../../store";
import modalControlsStore from "../../store/modalControls";
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
	const modal = modalControlsStore((state) => state.modal);
	const onClose = modalControlsStore((state) => state.closeModal);
	const [selectedItem, setSelectedItem] = useState();
	const prevMyStateValueRef = useRef();
	function handleMapSelect(item, id) {
		setSelectedItem(item);
		fetchMap(id);
	}

	useEffect(() => {
		prevMyStateValueRef.current = maps;
	});
	const prevMyStateValue = prevMyStateValueRef.current;

	useEffect(() => {
		if (!maps.length || maps !== prevMyStateValue) fetchMaps();
	}, []);

	useEffect(() => {
		if (!selectedItem) {
			handleMapSelect(maps[0]);
		}
	}, [loading]);

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
			<CustomModal modal={modal} onClose={onClose}>
				<ProjectForm />
			</CustomModal>
		</main>
	);
}
