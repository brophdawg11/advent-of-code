import fs, { read } from "node:fs";

let lines = fs.readFileSync("./11-input.txt", "utf8").split("\n");

function readMonkeys() {
  let monkeys = [];
  let monkeyIdx = 0;

  let i = 0;
  while (i < lines.length) {
    let line = lines[i];
    if (!/^Monkey/.test(line)) {
      throw new Error("Bad input");
    }

    line = lines[++i];
    let items = line
      .split(":")[1]
      .split(",")
      .map((s) => BigInt(Number(s.trim())));

    line = lines[++i];
    let operation = line
      .split(":")[1]
      .trim()
      .replace(/(new|old)/g, "worry")
      .replace(/(\d+)/, "BigInt($1)");

    line = lines[++i];
    let divisible = BigInt(Number(line.split(":")[1].trim().split(" ")[2]));

    line = lines[++i];
    let ifTrue = Number(line.split(":")[1].trim().split(" ")[3]);

    line = lines[++i];
    let ifFalse = Number(line.split(":")[1].trim().split(" ")[3]);

    monkeys.push({
      items,
      operation,
      divisible,
      ifTrue,
      ifFalse,
      inspections: BigInt(0),
    });

    i += 2;
    monkeyIdx++;
  }

  return monkeys;
}

function execute(isPart1) {
  let monkeys = readMonkeys();
  let monkeyIdx = 0;

  // Thanks Joe!
  let modulus = monkeys.map((m) => m.divisible).reduce((a, b) => a * b, 1n);

  let round = 1;
  let rounds = isPart1 ? 20 : 10000;

  // Part 1 rounds = 20
  while (round <= rounds) {
    monkeyIdx = 0;
    while (monkeyIdx < monkeys.length) {
      let monkey = monkeys[monkeyIdx];
      let { items, operation, divisible, ifTrue, ifFalse } = monkey;
      while (items.length > 0) {
        let worry = items.shift();
        eval(operation);
        monkey.inspections = monkey.inspections + 1n;
        if (isPart1) {
          worry = worry / 3n;
        }
        if (worry % divisible === 0n) {
          monkeys[ifTrue].items.push(worry % modulus);
        } else {
          monkeys[ifFalse].items.push(worry % modulus);
        }
      }
      monkeyIdx++;
    }

    round++;
  }

  let inspections = monkeys
    .map((m) => m.inspections)
    .sort((a, b) => (BigInt(a) - BigInt(b) < 0 ? -1 : 1))
    .reverse();
  return inspections;
}

let part1 = execute(true);
console.log("Part 1:", part1[0] * part1[1]);

let part2 = execute(false);
console.log("Part 2:", part2[0] * part2[1]);
