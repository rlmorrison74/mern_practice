import mongoose from "mongoose";

const MONGODB_URI =
  process.env.PROD_MONGODB || "mongodb://127.0.0.1:27017/mernPractice";

mongoose.set("returnOriginal", false);

mongoose
  .connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .catch((error) =>
    console.error("Error connecting to MongoDB", error.message)
  );

mongoose.connection.on("disconnected", () =>
  console.log("Disconnected from server")
);
mongoose.connection.on("error", (error) =>
  console.log("Error connecting to MongoDB", error.message)
);

export default mongoose.connection