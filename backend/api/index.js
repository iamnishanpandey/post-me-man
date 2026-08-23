import app from "../src/app.js";
import connectDB from "../src/db/db.js";

let databaseConnection;

async function ensureDatabaseConnection() {
  if (!databaseConnection) {
    databaseConnection = connectDB().catch((error) => {
      // Allow a later request to retry if the first connection attempt fails.
      databaseConnection = undefined;
      throw error;
    });
  }

  return databaseConnection;
}

// Vercel invokes this handler for each HTTP request. Keep app.listen() in
// server.js for local development only.
export default async function handler(req, res) {
  try {
    await ensureDatabaseConnection();
    return app(req, res);
  } catch (error) {
    console.error("Failed to initialise the API:", error);
    return res.status(500).json({
      message: "The API could not connect to its database.",
    });
  }
}
