import fs from "node:fs";

let file = fs.readFileSync("./01-input.txt", "utf8");
let lines = file.split("\n");

// Part 1
// let max = 0;
// let sum = 0;
// lines.forEach((line) => {
//   if (line.trim() === "") {
//     if (sum > max) {
//       max = sum;
//     }
//     sum = 0;
//   } else {
//     sum += parseInt(line, 10);
//   }
// });
// console.log(max);

// Part 2
let sum = 0;
let sums = [];
lines.forEach((line) => {
  if (line.trim() === "") {
    sums.push(sum);
    sum = 0;
  } else {
    sum += parseInt(line, 10);
  }
});

sums = sums.sort().reverse();
console.log(sums[0] + sums[1] + sums[2]);
