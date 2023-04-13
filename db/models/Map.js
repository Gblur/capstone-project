import mongoose from "mongoose";
import {uid} from "uid";

const {Schema} = mongoose;

const MapSchema = new Schema({
	name: {type: String, required: true},
	team: String,
	mapType: {type: String, required: true},
	description: String,
	nodes: String,
	edges: String,
});

const Map = mongoose.models.Map || mongoose.model("Map", MapSchema);

export default Map;
