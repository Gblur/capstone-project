import fetch from "node-fetch"; // Initializing a client

export default async function handler(req, res) {
	const notionSecret = process.env.NOTION_SECRET;
	const {id} = req.query;
	switch (req.method) {
		case "GET":
			const response = await fetch(
				"https://api.notion.com/v1/pages/110e69c56cca426f84a4ec5b6be3ec6f",
				{
					headers: {
						Authorization: `${notionSecret}`,
						"Notion-Version": "2022-02-22",
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();
			return res.status(200).json(data);
		case "POST":
			const newPost = await fetch("https://api.notion.com/v1/pages/", {
				method: "POST",
				headers: {
					Authorization: `${notionSecret}`,
					"Notion-Version": "2022-02-22",
					"Content-Type": "application/json",
				},
				body: req.body,
			});
			return res.status(200).json(newPost);
		default:
			return res.status(301).json({message: "Method not allowed"});
	}
}
