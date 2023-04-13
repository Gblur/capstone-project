// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Map from "../../db/models/Map";
import dbConnect from "../../db/connect.js";

export default async function handler(req, res) {
	await dbConnect();
	const data = req.body;
	switch (req.method) {
		case "GET":
			const map = await Map.find();
			return res.status(200).json(map);
		case "POST":
			try {
				const newProject = await new Map(data);
				await newProject.save();
				return res
					.status(200)
					.json({status: "new Map created", _id: newProject._id});
			} catch (error) {
				return res.status(400).json({error: error.message});
			}
		default:
			return res.status(301).json({message: "Method not allowed"});
	}
}
