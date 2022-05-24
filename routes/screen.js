import express from "express";
// import { getScreen, createScreen } from "../controllers/posts.js";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("hello");
});
router.post("/", (req, res) => {
  res.send("hey");
});
export default router;
