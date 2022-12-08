import { takeWhile } from "lodash-es";
import fs from "node:fs";

let lines = fs.readFileSync("./08-input.txt", "utf8").split("\n");

let trees = lines.map((line) => line.split("").map(Number));

let max = (arr) => arr.reduce((max, n) => Math.max(max, n), 0);

let visible = 0;
let scenicScore = 0;

trees.forEach((row, i) => {
  row.forEach((height, j) => {
    let col = trees.map((t) => t[j]);
    let above = col.slice(0, i);
    let below = col.slice(i + 1);
    let left = row.slice(0, j);
    let right = row.slice(j + 1);

    let calc = (arr) => {
      let s = takeWhile(arr, (n) => n < height).length;
      return s === arr.length ? s : s + 1;
    };

    let ascore = calc([...above].reverse());
    let bscore = calc(below);
    let lscore = calc([...left].reverse());
    let rscore = calc(right);
    let score = ascore * bscore * lscore * rscore;
    scenicScore = Math.max(score, scenicScore);

    if (
      i === 0 ||
      i === trees[i].length - 1 ||
      j === 0 ||
      j === row.length - 1
    ) {
      visible++;
    } else if (
      height > max(above) ||
      height > max(below) ||
      height > max(left) ||
      height > max(right)
    ) {
      visible++;
    }
  });
});

console.log("Part 1:", visible);
console.log("Part 2:", scenicScore);
