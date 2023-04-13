import mongoose from "mongoose";
import {uid} from "uid";

const {Schema} = mongoose;

const MapSchema = new Schema({
	name: {type: String, required: true},
	team: String,
	mapType: {type: String, required: true},
	description: String,
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
			parent: {
				type: String,
			},
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
});

const Map = mongoose.models.Map || mongoose.model("Map", MapSchema);

export default Map;
