import fs from "node:fs";

let lines = fs.readFileSync("./04-input.txt", "utf8").split("\n");

let contained = 0;
let overlap = 0;

lines.forEach((line) => {
  let [a, b] = line.split(",");
  let [a1, a2] = a.split("-");
  let [b1, b2] = b.split("-");
  a1 = parseInt(a1);
  a2 = parseInt(a2);
  b1 = parseInt(b1);
  b2 = parseInt(b2);
  if ((a1 <= b1 && a2 >= b2) || (b1 <= a1 && b2 >= a2)) {
    contained++;
  }
  if (
    (a1 <= b1 && a2 >= b1) ||
    (a1 <= b2 && a2 >= b2) ||
    (b1 <= a1 && b2 >= a1) ||
    (b1 <= a2 && b2 >= a2)
  ) {
    overlap++;
  }
});

console.log("Part 1:", contained);
console.log("Part 2:", overlap);
