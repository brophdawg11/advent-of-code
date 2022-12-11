import fs from "node:fs";

let lines = fs.readFileSync("./10-input.txt", "utf8").split("\n");

let X = 1;
let queue = {};
let sum = 0;
let cycle = 1;
let crts = ["", "", "", "", "", ""];

function process(cycle) {
  if ((cycle + 20) % 40 === 0) {
    // console.log(
    //   `Cycle ${cycle}: X=${X}, sum=${sum}, cycle sum=${cycle * X}, new sum=${
    //     sum + cycle * X
    //   }`
    // );
    sum += cycle * X;
  }

  let pos = cycle === 0 ? 0 : (cycle - 1) % 40;

  if (pos >= X - 1 && pos <= X + 1) {
    crts[Math.floor((cycle - 1) / 40)] += "#";
  } else {
    crts[Math.floor((cycle - 1) / 40)] += ".";
  }

  if (queue[cycle]) {
    while (queue[cycle].length > 0) {
      X += queue[cycle].shift();
    }
    delete queue[cycle];
  }
}

lines.forEach((line) => {
  let [cmd, val] = line.split(" ");
  val = val != "" ? Number(val) : null;

  if (cmd === "noop") {
    process(cycle++);
  } else if (cmd === "addx") {
    queue[cycle + 1] = [...(queue[cycle + 1] || []), val];
    process(cycle++);
    process(cycle++);
  } else {
    throw new Error("Nope");
  }
});

console.log("Part 1:", sum);

console.log("Part 2:");
crts.forEach((crt) => console.log(crt));
