import app from "./src/app.js";
import connectDB from "./src/db/db.js";
import "dotenv/config";

connectDB();

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`the server is lunching on http://localhost:${port}`);
});
