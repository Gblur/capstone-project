import mongoose from "mongoose";

const {Schema} = mongoose;

const MapSchema = new Schema({
	name: {type: String, required: true},
	team: String,
	mapType: {type: String, required: true},
	description: String,
	nodes: String,
	edges: String,
});

const UserSchema = new Schema({
	name: String,
	email: String,
});

const Map = mongoose.models.Map || mongoose.model("Map", MapSchema);
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export const Schemas = {
	Map,
	User,
};
