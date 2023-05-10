// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Map from "../../../../db/models/Map.js";
import User from "../../../../db/models/User.js";
import dbConnect from "../../../../db/connect.js";
import {getServerSession} from "next-auth/next";
import {authOptions} from "../../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  await dbConnect();
  const {id} = req.query;
  const data = req.body;
  switch (req.method) {
    case "GET":
      const MapById = await Map.findById(id);
      return res.status(200).json(MapById);
    case "PUT":
      const updatedMaps = await Map.findByIdAndUpdate(id, {$set: data});
      return res.status(200).json(updatedMaps);
    default:
      return res.status(301).json({message: "Method not allowed"});
  }
}
