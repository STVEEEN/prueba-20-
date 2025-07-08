import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import clientsRoutes from "./src/routes/clients.routes.js";
import reservationsRoutes from "./src/routes/reservations.routes.js";
import swaggerUi from "swagger-ui-express"
import fs from "fs"
import path from "path";

const app = express();

app.use(express.json());
//Que acepte cookies en postman
app.use(cookieParser());

const swaggerDocument = JSON.parse(
    fs.readFileSync(path.resolve("./documentation.json"), "utf-8")
);


app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/clients", clientsRoutes);
app.use("/api/reservations", reservationsRoutes);

export default app;



