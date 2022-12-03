import fs from "node:fs";
import { groupBy, intersection } from "lodash-es";

let lines = fs.readFileSync("./03-input.txt", "utf8").split("\n");

function getPriority(char) {
  let code = char.charCodeAt(0);
  if (code >= 65 && code <= 90) {
    return code - 38;
  } else if (code >= 97 && code <= 122) {
    return code - 96;
  } else {
    throw new Error("Invalid code: " + code);
  }
}

let sum = 0;
lines.forEach((line) => {
  let sack1 = groupBy(line.substring(0, line.length / 2).split(""));
  let sack2 = groupBy(line.substring(line.length / 2).split(""));
  let shared = intersection(Object.keys(sack1), Object.keys(sack2));
  sum += shared.reduce((acc, char) => acc + getPriority(char), 0);
});

console.log("Part 1:", sum);

let group = 0;
let count = 0;
let elfGroups = groupBy(lines, (line) => {
  if (count < 2) {
    count++;
    return group;
  } else if (count === 2) {
    count = 0;
    return group++;
  } else {
    throw new Error("Nope");
  }
});

let sum2 = 0;
Object.values(elfGroups).forEach((group) => {
  let shared = intersection(
    Object.keys(groupBy(group[0])),
    Object.keys(groupBy(group[1])),
    Object.keys(groupBy(group[2]))
  );
  sum2 += shared.reduce((acc, char) => acc + getPriority(char), 0);
});

console.log("Part 2:", sum2);
