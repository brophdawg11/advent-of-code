import fs from "node:fs";

let lines = fs.readFileSync("./12-input.txt", "utf8").split("\n");
let grid = lines.map((line) => line.split("").map((s) => s.charCodeAt(0)));

// Find start/end point
let start;
let end;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if ("S".charCodeAt(0) === grid[y][x]) {
      start = [x, y];
    }
    if ("E".charCodeAt(0) === grid[y][x]) {
      end = [x, y];
    }
  }
}

const h = (x, y) =>
  String.fromCharCode(grid[y][x]) === "S"
    ? "a".charCodeAt(0)
    : String.fromCharCode(grid[y][x]) === "E"
    ? "z".charCodeAt(0)
    : grid[y][x];
const charAt = (p) => String.fromCharCode(grid[p[1]][p[0]]);
const within = (v, l, u) => v > l && v < u;
const allowed = (curr, next) => next + 1 >= curr;
const equal = (a, b) => a[0] === b[0] && a[1] === b[1];

function findOptions([x, y]) {
  let curHeight = h(x, y);
  let gw = grid[0].length;
  let gh = grid.length;
  return [
    ...(within(x, 0, gw) && allowed(curHeight, h(x - 1, y))
      ? [[x - 1, y]]
      : []),
    ...(within(x, -1, gw - 1) && allowed(curHeight, h(x + 1, y))
      ? [[x + 1, y]]
      : []),
    ...(within(y, 0, gh) && allowed(curHeight, h(x, y - 1))
      ? [[x, y - 1]]
      : []),
    ...(within(y, -1, gh - 1) && allowed(curHeight, h(x, y + 1))
      ? [[x, y + 1]]
      : []),
  ];
}

let part1Length;
let part2Length;
let seen = new Set();
let queue = [[end, 0]];

while ((part1Length == null || part2Length == null) && queue.length) {
  let [pos, dist] = queue.shift();

  let options = findOptions(pos);
  options.forEach((opt) => {
    if (!part1Length && equal(opt, start)) {
      part1Length = dist + 1;
    }
    if (!part2Length && charAt(opt) === "a") {
      part2Length = dist + 1;
    }
    if (!seen.has(opt.join("-"))) {
      seen.add(opt.join("-"));
      queue.push([opt, dist + 1]);
    }
  });
}

console.log("Part 1:", part1Length);
console.log("Part 2:", part2Length);
