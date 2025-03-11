export default {
	providers: [
		{
			domain: `${process.env.CLERK_ISSUER_DOMAIN_CONVEX}`,
			applicationID: "convex",
		},
	],
};
