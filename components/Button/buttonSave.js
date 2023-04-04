import React from "react";

export default function ButtonSave({setFormData}) {
	async function handleClick(event) {
		const formdata = new FormData(event.target);
		const data = Object.fromEntries(formdata);
		setFormData(data);
	}

	return (
		<>
			<button onClick={handleClick}>Save Map</button>
		</>
	);
}
