import fs from "node:fs";

let lines = fs.readFileSync("./13-input.txt", "utf8").split("\n");

let pairs = [];

while (lines.length > 0) {
  pairs.push([JSON.parse(lines.shift()), JSON.parse(lines.shift())]);
  lines.shift();
}

let properlySortedIndices = [];

function compareItems(l, r) {
  if (typeof l === "undefined" && typeof r !== "undefined") {
    throw true;
  }
  if (typeof r === "undefined" && typeof l !== "undefined") {
    throw false;
  }
  if (typeof l === "number" && typeof r == "number") {
    if (l > r) {
      throw false;
    } else if (l < r) {
      throw true;
    }
  } else {
    if (typeof l === "number") {
      l = [l];
    }
    if (typeof r === "number") {
      r = [r];
    }
    for (let k = 0; k < Math.max(l.length, r.length); k++) {
      compareItems(l[k], r[k]);
    }
  }
}

for (let i = 0; i < pairs.length; i++) {
  let [left, right] = pairs[i];

  try {
    compareItems(left, right);
    properlySortedIndices.push(i + 1);
  } catch (e) {
    if (e === true) {
      properlySortedIndices.push(i + 1);
    }
  }
}

console.log(
  "Part 1:",
  properlySortedIndices.reduce((acc, n) => acc + n, 0)
);

let pairs2 = [...pairs.flatMap((p) => p), [[2]], [[6]]];

function comparator(a, b) {
  try {
    compareItems(a, b);
    return -1;
  } catch (e) {
    if (e === true) {
      return -1;
    } else {
      return 1;
    }
  }
}

pairs2.sort(comparator);
let idx = pairs2.findIndex((p) => JSON.stringify(p) === "[[2]]");
let idx2 = pairs2.findIndex((p) => JSON.stringify(p) === "[[6]]");

console.log("Part 2:", (idx + 1) * (idx2 + 1));
