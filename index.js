import app from "./app.js";
import "./database.js"
import { config } from "./src/config.js";

//Creamos la funcion
async function main() {
    app.listen(config.server.port);
    console.log(`Server is running on port ${config.server.port}`);
}

main();