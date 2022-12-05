import fs from "node:fs";

let lines = fs.readFileSync("./05-input.txt", "utf8").split("\n");

let idx = lines.findIndex((l) => l.trim() == "");
let stackLines = lines.slice(0, idx);
let moveLines = lines.slice(idx + 1);
// Remove number labels and determine how many stacks we have
let numStacks = stackLines.pop().split(" ").pop();

// Build stacks
let stacks = {};
for (let i = 1; i <= numStacks; i++) {
  stackLines.forEach((l) => {
    let idx = (i - 1) * 3 + i;
    let crate = l.substring(idx, idx + 1);
    if (crate.trim()) {
      stacks[i] = stacks[i] ? [crate, ...stacks[i]] : [crate];
    }
  });
}

// Process moves (part 1)
// moveLines.forEach((line) => {
//   let [, num, from, to] = line.match(/move (\d+) from (\d+) to (\d+)/);
//   while (num-- > 0) {
//     let crate = stacks[from].pop();
//     stacks[to].push(crate);
//   }
// });

// let tops = Object.values(stacks).reduce(
//   (arr, stack) => [...arr, stack[stack.length - 1]],
//   []
// );

// console.log("Part 1:", tops.join(""));

// Process moves (part 2)
moveLines.forEach((line) => {
  let [, num, from, to] = line.match(/move (\d+) from (\d+) to (\d+)/);
  let crate = stacks[from].splice(stacks[from].length - num);
  stacks[to].push(...crate);
});

let tops = Object.values(stacks).reduce(
  (arr, stack) => [...arr, stack[stack.length - 1]],
  []
);

console.log("Part 2:", tops.join(""));
