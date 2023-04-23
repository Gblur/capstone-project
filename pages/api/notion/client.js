const {Client} = require("@notionhq/client");
// Initializing a client
const notion = new Client({
	auth: process.env.NOTION_SECRET,
});
const databaseId = process.env.DATABASE_ID;

export default async function handler(req, res) {
	const data = req.body;

	if (req.method === "POST") {
		try {
			// Create a new page in Notion
			await notion.pages.create({
				parent: {
					database_id: databaseId,
				},
				icon: {
					emoji: "🥬",
				},
				description: [data.message],
				properties: {
					"Task name": {
						title: [
							{
								text: {
									content: data.title,
								},
							},
						],
					},
				},
				Status: {
					type: "status",
					status: {
						name: "Done",
					},
				},
			});
			// Return a success message
			res.status(200).json({message: "Successfully created"});
		} catch (error) {
			console.error(error);

			// Return an error message
			res.status(500).json({
				message: "An error occurred while creating the page.",
			});
		}
	}
}
