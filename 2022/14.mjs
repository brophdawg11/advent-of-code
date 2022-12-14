import fs from "node:fs";

let lines = fs.readFileSync("./14-input.txt", "utf8").split("\n");

function go(hasFloor) {
  // Create vector for rock formations
  let vec = new Map();
  let ceiling = 0;
  let set = (x, y, v) => {
    if (v === "rock" && y > ceiling) {
      ceiling = y;
    }
    vec.set(`${x}-${y}`, v);
  };
  let has = (x, y) => vec.has(`${x}-${y}`);
  let paths = lines.map((line) => line.split("->").map((l) => l.trim()));

  paths.forEach((path) => {
    let cur = path.shift().split(",").map(Number);
    let next;
    while (path.length) {
      next = path.shift().split(",").map(Number);
      if (cur[0] === next[0]) {
        // vertical line
        let delta = next[1] - cur[1];
        for (let i = 0; i <= Math.abs(delta); i++) {
          let y = cur[1] + i * (delta / Math.abs(delta));
          set(cur[0], y, "rock");
        }
      } else if (cur[1] === next[1]) {
        // horitizontal line
        let delta = next[0] - cur[0];
        for (let i = 0; i <= Math.abs(delta); i++) {
          let x = cur[0] + i * (delta / Math.abs(delta));
          set(x, cur[1], "rock");
        }
      } else {
        throw new Error("nope");
      }
      cur = next;
    }
  });

  // drop sand
  let start = [500, 0];
  let restedSand = 0;
  let done = false;

  while (!done) {
    let sand = [...start];
    let rested = false;
    let moved = false;
    while (!rested) {
      let didReachFloor = hasFloor && sand[1] + 1 === ceiling + 2;
      if (!has(sand[0], sand[1] + 1) && !didReachFloor) {
        // Drop down one vertically
        sand[1]++;
        moved = true;
      } else if (!has(sand[0] - 1, sand[1] + 1) && !didReachFloor) {
        // Drop down left
        sand[0]--;
        sand[1]++;
        moved = true;
      } else if (!has(sand[0] + 1, sand[1] + 1) && !didReachFloor) {
        // Drop down left
        sand[0]++;
        sand[1]++;
        moved = true;
      } else {
        set(sand[0], sand[1], "sand");
        rested = true;
        restedSand++;
      }
      if (hasFloor) {
        if (!moved) {
          done = true;
        }
      } else if (sand[1] === ceiling) {
        done = true;
        break;
      }
    }
  }

  return restedSand;
}

console.log("Part 1:", go(false)); // 638
console.log("Part 2:", go(true));
