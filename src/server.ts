import app from "./app";
import configuration from "./app/config";
import mongoose from "mongoose";

async function main() {
  try {
    await mongoose.connect(configuration.database_url as string);

    app.listen(configuration.port, () => {
      console.log(`my server in running on port:${configuration.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
