import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/pricesmartDB")


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