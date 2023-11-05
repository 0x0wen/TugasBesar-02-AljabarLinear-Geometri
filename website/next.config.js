/** @type {import('next').NextConfig} */
const nextConfig = {
	rewrites: async () => {
	  return [
		{
		  source: "/api/:path*",
		  destination:
			process.env.NODE_ENV === "development"
			  ? "http://127.0.0.1:8000/api/:path*"
			  : "/api/",
		},
	  ];
	},
  };
  
  module.exports = nextConfig;
  

/*In the above code snippet, we define a rewrite rule within the rewrites property of the nextConfig object. This rule specifies that any request matching the pattern /api/:path* should be rewritten and redirected to a destination.

During development, the destination URL will be set to http://127.0.0.1:8000/api/:path*. This means that API requests made to the Next.js app will be proxied to the FastAPI server running locally on http://127.0.0.1:8000.
In a production environment, the destination URL will be set to "/api/", indicating that API requests should be proxied to the same domain as the Next.js app itself. To make this configuration work, we will need to set up CORS on the FastAPI server to accept all requests proxied to it. We will cover this step later when creating the CRUD API for the Todo app.
 */
