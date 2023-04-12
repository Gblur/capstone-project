import mongoose from "mongoose";

const {Schema} = mongoose;

const MapSchema = new Schema({
	name: String,
	team: String,
	template: String,
	description: String,
	mapType: String,
	map: {
		nodes: [
			{
				data: {
					label: String,
					background: String,
					nodeType: String,
					status: String,
				},
				id: {
					type: String,
				},
				type: {
					type: String,
				},
				parent: String,
				position: {
					x: Number,
					y: Number,
				},
			},
		],
		edges: [
			{
				id: {
					type: String,
				},
				target: String,
				source: String,
			},
		],
	},
});

const Map = mongoose.models.Map || mongoose.model("Map", MapSchema);

export default Map;
