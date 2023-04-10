import mongoose from "mongoose";

const {Schema} = mongoose;

const MapSchema = new Schema({
	id: mongoose.ObjectId,
	name: String,
	team: String,
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
					unique: true,
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
					unique: true,
				},
				target: String,
				source: String,
			},
		],
	},
});

const Map = mongoose.models.Map || mongoose.model("Map", MapSchema);

export default Map;
