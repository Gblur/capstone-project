import React, {useState} from "react";
import Canvas from "../../components/Canvas";
import "reactflow/dist/style.css";
import Filter from "../../components/Canvas/FilterData";

export default function MapDetailsPage() {
	const [filter, setFilter] = useState("HTML");
	const id = "64344942474bdd70be2756cc";

	function handleFilter(filter) {
		setFilter(filter);
	}

	return (
		<main style={{height: `calc(100vh - 250px)`}}>
			<h2>Mapname</h2>
			<Filter setFilterValue={handleFilter} />
			<Canvas id={id} filter={filter} />
		</main>
	);
}
