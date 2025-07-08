import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import clientsRoutes from "./src/routes/clients.routes.js";
import reservationsRoutes from "./src/routes/reservations.routes.js";

const app = express();

app.use(express.json());
//Que acepte cookies en postman
app.use(cookieParser());

app.use("/clients", clientsRoutes);
app.use("/reservations", reservationsRoutes);

export default app;



