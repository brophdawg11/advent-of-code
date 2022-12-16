import fs from "node:fs";

let lines = fs.readFileSync("./15-input.txt", "utf8").split("\n");

let re =
  /Sensor at x=([-\d]+), y=([-\d]+): closest beacon is at x=([-\d]+), y=([-\d]+)/;
let sensors = new Map();
let beacons = new Set();
let add = (sx, sy, bx, by, d) => {
  sensors.set(`${sx}:${sy}`, `${bx}:${by}:${d}`);
  beacons.add(`${bx}:${by}`);
};
let mdist = (sx, sy, bx, by) => Math.abs(sx - bx) + Math.abs(sy - by);
let rangex = [Infinity, -Infinity];
let rangey = [Infinity, -Infinity];

lines.forEach((line) => {
  let [, sx, sy, bx, by] = line
    .match(re)
    .map((s, i) => (i >= 1 && i <= 4 ? Number(s) : s));
  let range = mdist(sx, sy, bx, by);
  add(sx, sy, bx, by, range);
  rangex[0] = Math.min(rangex[0], sx - range);
  rangex[1] = Math.max(rangex[1], sx + range);
  rangey[0] = Math.min(rangey[0], sy - range);
  rangey[1] = Math.max(rangey[1], sy + range);
});

// let row = 10;
let row = 2000000;

let sensorsToCheck = new Map();
for (let [s, b] of sensors) {
  let [, sy] = s.split(":").map(Number);
  let [, , range] = b.split(":").map(Number);
  if (sy - range <= row && sy + range >= row) {
    sensorsToCheck.set(s, b);
  }
}

let reachable = [];
for (let x = rangex[0]; x <= rangex[1]; x++) {
  if (beacons.has(`${x}:${row}`)) {
    continue;
  }
  let reached = false;
  for (let [s, b] of sensorsToCheck) {
    let [sx, sy] = s.split(":").map(Number);
    let [, , range] = b.split(":").map(Number);
    if (mdist(sx, sy, x, row) <= range) {
      reached = true;
      continue;
    }
  }
  if (reached) {
    reachable.push(x);
  }
}

console.log("Part 1:", reachable.length); //4961647

// let coords = [0, 20];
let coords = [0, 4000000];

function getBorderingPositions(sx, sy, range) {
  let positions = [];
  for (let y = 0; y <= range + 1; y++) {
    positions.push([sx + y, sy - range - 1 + y]);
    positions.push([sx - y, sy - range - 1 + y]);
    positions.push([sx + y, sy + range + 1 - y]);
    positions.push([sx - y, sy + range + 1 - y]);
  }
  return positions;
}

let beacon = null;
LOOP: for (let [s, b] of sensors) {
  let [sx, sy] = s.split(":").map(Number);
  let [, , range] = b.split(":").map(Number);
  let positions = getBorderingPositions(sx, sy, range);
  for (let pos of positions) {
    let [x, y] = pos;
    if (x < coords[0] || x > coords[1] || y < coords[0] || y > coords[1]) {
      continue;
    }
    let reached = false;
    for (let [s, b] of sensors) {
      let [sx, sy] = s.split(":").map(Number);
      let [, , range] = b.split(":").map(Number);
      if (mdist(sx, sy, x, y) <= range) {
        reached = true;
      }
    }
    if (!reached) {
      beacon = [x, y];
      break LOOP;
    }
  }
}

if (!beacon) {
  throw new Error("no beacon found for part 2");
}

console.log("Part 2:", beacon[0] * 4000000 + beacon[1]);
