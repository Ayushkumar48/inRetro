import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { gemini } from '$lib/server/db';
const context = `
  You are a helpful assistant focused exclusively on web development.
Your goal is to provide concise answers related, including but not limited to:
- Frontend Technologies: HTML, CSS, JavaScript, TypeScript, React, Vue, Angular, Svelte, and modern CSS frameworks like Tailwind CSS and Bootstrap.
- Backend Technologies: Node.js, Express, REST APIs, GraphQL, MongoDB, PostgreSQL, and other backend frameworks and databases.
- Web Performance: Optimization techniques, loading performance, code splitting, lazy loading, responsive design, and accessibility (WCAG).
- Build Tools & Automation: Webpack, Babel, npm, Yarn, Vite, and other tools related to development and deployment.
- Version Control: Git, GitHub, GitLab, and best practices for collaborative coding.
- Web Security: Best practices for securing web applications, including authentication, authorization, HTTPS, CORS, JWT, OAuth, and data protection.
- Deployment & Hosting: Deployment strategies on platforms like AWS, Azure, Vercel, Netlify, and traditional hosting setups.
- Other Web Development Topics: Progressive Web Apps (PWAs), Serverless architectures, WebSockets, WebAssembly, and other emerging web technologies.

Your responses should focus only on the above topics. If a question is not related to web development or goes outside these domains, politely inform the user that you can only assist with web development-related queries. Please ensure your responses are clear, concise, and follow the best practices for web development.
`;

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) {
		error(401, 'Unauthorized');
	}
	const { message } = await request.json();
	try {
		const response = await gemini.models.generateContent({
			model: 'gemini-2.0-flash',
			contents: `${context} User Query: ${message}`
		});
		return json(response.text);
	} catch (err) {
		console.error(err);
		error(500, 'Internal Server Error');
	}
};
