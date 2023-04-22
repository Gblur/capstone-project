import {Octokit} from "@octokit/rest";

export default async function handler(req, res) {
	const user = req.query;
	const octokit = new Octokit({
		auth: process.env.GITHUB_ADMIN_TOKEN,
	});

	// console.log(user);
	switch (req.method) {
		case "GET":
			const repos = await octokit.request(`/users/Gblur/repos`);
			return res.status(200).json(repos);
		case "POST":
			return res.status(200).json({status: "Cool"});
	}
}
