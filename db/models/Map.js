import mongoose from "mongoose";

const {Schema} = mongoose;

const MapSchema = new Schema({
	name: {type: String, required: true},
	team: String,
	mapType: {type: String, required: true},
	description: String,
	date: {type: String},
	user: String,
	nodes: String,
	edges: String,
});

const Map = mongoose.models.Map || mongoose.model("Map", MapSchema);

export default Map;
