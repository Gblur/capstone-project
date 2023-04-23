const {Client} = require("@notionhq/client");
// Initializing a client
const notion = new Client({
	auth: process.env.NOTION_SECRET,
});

export default async function handler(req, res) {
	const databaseId = "110e69c5-6cca-426f-84a4-ec5b6be3ec6f";
	const pageId = "0ce9033e-8abf-4b17-a11b-257f3a66bcff";

	const data = req.body;

	try {
		// Create a new page in Notion
		await notion.pages.create({
			parent: {
				database_id: databaseId,
			},
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
		});

		// Return a success message
		res.status(200).json({message: "Page created successfully!"});
	} catch (error) {
		console.error(error);

		// Return an error message
		res.status(500).json({
			message: "An error occurred while creating the page.",
		});
	}
}
