import express from "express";
import routes from "./routes.js";
const app = express();

app.use("/screen", routes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server in running on port: ${PORT}`));
