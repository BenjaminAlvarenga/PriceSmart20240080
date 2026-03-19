








































     import mongoose from "mongoose";
import { config } from "./src/config.js";

mongoose.connect(config.db.URI);

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB database is connected");
})

connection.on("disconnected", () => {
    console.error("MongoDB database is disconnected");
});

connection.on("error", (error) => {
    console.error("MongoDB database connection error:", error);
});