import express from "express";
import screenRouter from "./routes/screen.js";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
const __dirname = path.resolve();

const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use("/", screenRouter);
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/script.js", express.static("./script.js"));
app.use("/data.json", express.static("./data.json"));
app.use("/views", express.static("./views"));

app.get("/", (req, res) => {
  res.send(`Go to http://localhost:${PORT}/messages=id`);
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () =>
  console.log("Server started at http://localhost:" + PORT)
);
