import app from "./app";
import config from "./config/config";
import connectDB from "./config/connection";

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});

connectDB();
