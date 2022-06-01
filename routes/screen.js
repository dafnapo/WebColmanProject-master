import express from "express";
import path from "path";
import massageService from "../controller/screen.js";
// import massage from "../models/screen.js";
const router = express.Router();

var filterAds = [];
let data;

router.get("/messages", (req, res) => {
  // let messages = massageService.getData();
  // messages
  //   .then((data) => {
  //     res.send(data);
  //   })
  //   .catch(function (e) {
  //     res.status(500, {
  //       error: e,
  //     });
  //   });
  res.sendFile(path.resolve("./views/base.html"));
});

router.get("/data", function (req, res) {
  var id = req.params.id;
  console.log("screen selected: " + id);
  var messages = massageService.getData();
  filterAds = messages.filter((ad) => ad.ids.some((x) => id.includes(x)));
  res.send(filterAds);

  // messages
  //   .then((data) => {
  //     if (data.length === 0) {
  //       res.status(404);
  //       res.send("id not found");
  //     } else {
  //       // console.log(data);
  //       res.send(data);
  //     }
  //   })
  //   .catch(function (e) {
  //     res.status(500, {
  //       error: e,
  //     });
  //   });
});

router.get("/newAds", function (req, res) {
  res.send(filterAds);
});

router.get("/views/ads", function (req, res) {
  res.send(filterAds);
});

export default router;
