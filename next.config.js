/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	compiler: {
		styledComponents: true,
	},
	images: {
		remotePatterns: [
			// {
			//   protocol: 'https',
			//   hostname: 'images.unsplash.com'
			// },
		],
	},
	experimental: {
		modularizeImports: {
			"@mui/material": {
				transform: "@mui/material/{{member}}",
			},
			"@mui/icons-material": {
				transform: "@mui/icons-material/{{member}}",
			},
		},
	},
};

module.exports = nextConfig;
