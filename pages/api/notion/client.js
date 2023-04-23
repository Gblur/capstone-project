const {Client} = require("@notionhq/client");
// Initializing a client
const notion = new Client({
	auth: process.env.NOTION_SECRET,
});

export default async function handler(req, res) {
	const databaseId = "110e69c5-6cca-426f-84a4-ec5b6be3ec6f";
	const data = req.body;

	if (req.method === "POST") {
		try {
			// Create a new page in Notion
			const response = await notion.pages.create({
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
			console.log(response);
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
