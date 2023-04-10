// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Map from "../../db/models/Map";
import dbConnect from "../../db/connect.js";

export default async function handler(req, res) {
	await dbConnect();

	const data = req.body;
	switch (req.method) {
		case "GET":
			const MapById = await Map.findById(id);
			return res.status(200).json(MapById);
		case "POST":
			try {
				await new Map(data).save();
				return res.status(200).json({status: "new Map created"});
			} catch (error) {
				return res.status(400).json({error: error.message});
			}

		default:
			return res.status(301).json({message: "Method not allowed"});
	}
}
