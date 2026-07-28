import app from "./app.js";

const port = Number(process.env.PORT ?? 3001);

console.log(`Server running on http://localhost:${port}`);
Bun.serve({ fetch: app.fetch, port });
