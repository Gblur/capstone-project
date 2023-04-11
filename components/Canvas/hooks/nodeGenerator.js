import {useEffect, useCallback} from "react";

export default function generator(data) {
	let base = -300;

	function filteredData(data, filter) {
		if (data) {
			return data.filter((item) => {
				if (filter) {
					return item.language === filter;
				}
				return item;
			});
		}
	}

	const filterData = filteredData(data, "HTML");

	function addChilds() {
		return filterData.map((item) => {
			return {
				id: item["node_id"],
				data: {
					label: item.name,
					status: item.visibility,
					background: "var(--color-node-child-bg)",
					type: "child",
					onChange: () => {},
				},
				position: {
					x: filterData.length > 10 ? 0 : (base += 200),
					y: filterData.length > 10 ? (base += 100) : 200,
				},
				parentNode: "1",
				type: "child",
				deletable: false,
				branches: item["branches_url"],
			};
		});
	}

	function connectChilds() {
		return filterData.map((item) => {
			return {
				id: item["node_id"],
				source: "1",
				target: item["node_id"],
				animated: true,
			};
		});
	}

	return {addChilds, connectChilds};
}
