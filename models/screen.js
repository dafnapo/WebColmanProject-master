import express from "express";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();

class massage {
  getData() {
    try {
      let rawData = fs.readFileSync("data.json");
      let massage = JSON.parse(rawData);
      return massage;
    } catch (error) {
      console.log(error.massage);
    }
  }
}

export default massage;
