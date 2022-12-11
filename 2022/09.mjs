import { range } from "lodash-es";
import fs from "node:fs";

let lines = fs.readFileSync("./09-input.txt", "utf8").split("\n");

function moveKnot(knot, dir, dist) {
  if (dir === "U") {
    knot[1] -= dist;
  } else if (dir === "D") {
    knot[1] += dist;
  } else if (dir === "R") {
    knot[0] += dist;
  } else if (dir === "L") {
    knot[0] -= dist;
  } else {
    throw new Error("nope");
  }
}

function pullKnot(lead, follow, dir, pos) {
  let dx = lead[0] - follow[0];
  let dy = lead[1] - follow[1];

  if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
    // no-op
  } else if (dx === 0 && Math.abs(dy) === 2) {
    follow[1] = follow[1] + dy / Math.abs(dy);
  } else if (dy === 0 && Math.abs(dx) === 2) {
    follow[0] = follow[0] + dx / Math.abs(dx);
  } else if (Math.abs(dx) === 1 && Math.abs(dy) === 2) {
    follow[0] = lead[0];
    follow[1] = follow[1] + dy / Math.abs(dy);
  } else if (Math.abs(dy) === 1 && Math.abs(dx) === 2) {
    follow[1] = lead[1];
    follow[0] = follow[0] + dx / Math.abs(dx);
  } else if (Math.abs(dy) === 2 && Math.abs(dx) === 2) {
    follow[1] = follow[1] + dy / Math.abs(dy);
    follow[0] = follow[0] + dx / Math.abs(dx);
  } else {
    throw new Error("Nope");
  }
  pos.add(`${follow[0]}-${follow[1]}`);
}

function part1() {
  let head = [0, 0];
  let tail = [0, 0];
  let positions = new Set();

  function print() {
    for (let y = -10; y <= 10; y++) {
      let line = "";
      for (let x = -10; x <= 10; x++) {
        if (head[0] === x && head[1] === y) {
          line += "H";
        } else if (tail[0] === x && tail[1] === y) {
          line += "T";
        } else if (0 === x && 0 === y) {
          line += "o";
        } else if (positions.has(`${x}-${y}`)) {
          line += "*";
        } else {
          line += ".";
        }
      }
      console.log(line);
    }
  }

  lines.forEach((line) => {
    let [dir, dist] = line.split(" ");
    dist = Number(dist);

    while (dist-- > 0) {
      moveKnot(head, dir, 1);
      //print();
      pullKnot(head, tail, dir, positions);
      //print();
    }
  });

  console.log("Part 1:", Array.from(positions.entries()).length);
}

function part2() {
  let knots = range(0, 10).map(() => [0, 0]);
  let positions = new Set();

  function print() {
    for (let y = -10; y <= 10; y++) {
      let line = "";
      for (let x = -10; x <= 10; x++) {
        let printed = false;
        for (let i = 0; i < knots.length && !printed; i++) {
          if (knots[i][0] === x && knots[i][1] === y) {
            line += i === 0 ? "H" : String(i);
            printed = true;
          }
        }
        if (!printed) {
          if (x === 0 && y === 0) {
            line += "o";
          } else if (positions.has(`${x}-${y}`)) {
            line += "*";
          } else {
            line += ".";
          }
        }
      }
      console.log(line);
    }
  }

  lines.forEach((line) => {
    let [dir, dist] = line.split(" ");
    dist = Number(dist);

    while (dist-- > 0) {
      moveKnot(knots[0], dir, 1);
      //print();
      for (let i = 1; i < knots.length; i++) {
        pullKnot(knots[i - 1], knots[i], dir, i === 9 ? positions : new Set());
        //print();
      }
    }
  });

  console.log("Part 2:", Array.from(positions.entries()).length);
}

part1();
part2();
