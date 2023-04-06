// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
	const data = req.body;
	const map = JSON.parse(JSON.stringify(data));
	switch (req.method) {
		case "GET":
			const nodes = Node.find();
			return res.status(200).json(nodes);
		case "POST":
			return res.status(200).json(map);
		default:
			return res.status(301).json({message: "Method not allowed"});
	}
}
