import app from "../src/app.js";
import connectDB from "../src/db/db.js";

// Vercel runs this module as a serverless function. Do not call app.listen()
// here; Vercel invokes the Express app for every HTTP request.
await connectDB();

export default app;
