"use strict";

import fs from "fs";

export function hashSingleImage(img) {
  return "data:image/png;base64, " + base64_encode(img);
}

function base64_encode(fileName) {
  const bitmap = fs.readFileSync(fileName);
  return new Buffer(bitmap).toString("base64");
}
