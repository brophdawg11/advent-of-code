import fs from "node:fs";
import { groupBy } from "lodash-es";

let line = fs.readFileSync("./06-input.txt", "utf8").split("\n")[0];

let marker = [];

//let len = 4; // Part 1
let len = 14; // Part 2

line.split("").forEach((char, i) => {
  if (Object.keys(groupBy(marker)).length === len) {
    console.log("Answer:", i);
    process.exit(0);
  } else {
    marker.push(char);
    if (marker.length > len) {
      marker.shift();
    }
  }
});
