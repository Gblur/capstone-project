// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Map from "../../db/models/Map";
import dbConnect from "../../db/connect.js";

export default async function handler(req, res) {
	await dbConnect();
	const data = req.body;
	switch (req.method) {
		case "GET":
			const MapById = await Map.find();
			return res.status(200).json(MapById);
		case "POST":
			try {
				const newProject = await Map.create(data);
				await newProject.save();
				return res
					.status(200)
					.json({status: "new Map created", _id: newProject._id});
			} catch (error) {
				return res.status(400).json({error: error.message});
			}
		case "PUT":
			const updatedMaps = await Map.findOneAndUpdate(
				{name: "Test"},
				{$set: data}
			);
			return res.status(200).json(updatedMaps);

		default:
			return res.status(301).json({message: "Method not allowed"});
	}
}
