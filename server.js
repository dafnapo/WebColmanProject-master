import express from "express";
import routes from "./routes/screen.js";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

app.use("/screen", routes);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`server in running on port: ${PORT}`));
