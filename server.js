import express from "express";
// import screenRouter from "./routes/screen.js";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import massageService from "./controller/screen.js";
const __dirname = path.resolve();

const app = express();

var filterAds = [];
let data;

massageService.initializeMessage();

const getData = async (filterNumber) => {
  var messages = await massageService.getAllMessages();
  console.log("selected screen: " + filterNumber);
  return messages.filter((item) => item.ids.includes(filterNumber));
};

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/script.js", express.static("./script.js"));
app.use("/data.json", express.static("./data.json"));
app.use("/views", express.static("./views"));
app.use(express.static(__dirname));

app.get("/", async function (req, res) {
  if (req?.query && req.query?.screen) {
    data = await getData(Number(req.query.screen));
    res.sendFile(path.resolve("./views/base.html"));
  } else res.send(`Go to http://localhost:${PORT}/?screen=id`);
});

app.get("/data", function (req, res) {
  res.send(data);
});

app.get("/templateA.html", function (req, res) {
  res.sendFile(__dirname + "/templateA.html");
});

app.get("/templateB.html", function (req, res) {
  res.sendFile(__dirname + "/templateB.html");
});

app.get("/templateC.html", function (req, res) {
  res.sendFile(__dirname + "/templateC.html");
});

app.get("/script.js", function (req, res) {
  res.sendFile(__dirname + "/script.js");
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () =>
  console.log("Server started at http://localhost:" + PORT)
);
