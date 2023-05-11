// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Map from "../../../db/models/Map.js";
import dbConnect from "../../../db/connect.js";
import User from "../../../db/models/User.js";
import {getServerSession} from "next-auth/next";
import {authOptions} from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    try {
      await dbConnect();
      const data = req.body;
      switch (req.method) {
        case "GET":
          const user = await User.findOne({email: session.user.email});
          const hasReadAccess = user.priviledges.includes("maps.read");
          if (hasReadAccess) {
            const map = await Map.find().populate("user");
            const filteredMap = map.filter(
              (map) => map.user.name === user.name
            );
            return res.status(200).json(filteredMap);
          } else res.status(403).json({message: "You have no read rights"});
        case "POST":
          try {
            const user = await User.findOne({name: session.user.name});
            const newProject = await new Map({...data, user: user});
            await newProject.save();
            return res
              .status(200)
              .json({status: "New Map created", _id: newProject._id});
          } catch (error) {
            return res.status(400).json({error: error.message});
          }

        case "DELETE":
          try {
            const mapToDelete = await Map.findByIdAndDelete(data);
            return res.status(200).json(mapToDelete);
          } catch (error) {
            return res.status(400).json({error: error.message});
          }
        default:
          return res.status(301).json({message: "Method not allowed"});
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    res.send({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
}
