import fs from "node:fs";

let file = fs.readFileSync("./02-input.txt", "utf8");
let lines = file.split("\n");

let plays = {
  A: "Rock",
  B: "Paper",
  C: "Scissors",
  X: "Rock",
  Y: "Paper",
  Z: "Scissors",
};

let reversePlays = {
  Rock: "A",
  Paper: "B",
  Scissors: "C",
};

let scores = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

// Part 1
function score(a, b) {
  if (!scores[plays[a]] || !scores[plays[b]]) {
    throw new Error("Invalid play");
  }
  let win =
    (plays[b] === "Rock" && plays[a] === "Scissors") ||
    (plays[b] === "Scissors" && plays[a] === "Paper") ||
    (plays[b] === "Paper" && plays[a] === "Rock");
  let draw = plays[a] === plays[b];

  if (draw) {
    return 3 + scores[plays[b]];
  } else if (win) {
    return 6 + scores[plays[b]];
  } else {
    return 0 + scores[plays[b]];
  }
}

let totalScore1 = 0;
lines.forEach((line) => {
  if (!line) return;
  let [a, b] = line.split(" ");
  let roundScore = score(a, b);
  totalScore1 += roundScore;
});

console.log("Part 1:", totalScore1);

// Part 2
let outcomes = {
  X: "lose",
  Y: "draw",
  Z: "win",
};

function play(a, b) {
  if (outcomes[b] === "win") {
    if (plays[a] === "Rock") {
      return score(a, reversePlays["Paper"]);
    } else if (plays[a] === "Paper") {
      return score(a, reversePlays["Scissors"]);
    } else if (plays[a] === "Scissors") {
      return score(a, reversePlays["Rock"]);
    }
  } else if (outcomes[b] === "lose") {
    if (plays[a] === "Rock") {
      return score(a, reversePlays["Scissors"]);
    } else if (plays[a] === "Paper") {
      return score(a, reversePlays["Rock"]);
    } else if (plays[a] === "Scissors") {
      return score(a, reversePlays["Paper"]);
    }
  } else if (outcomes[b] === "draw") {
    return score(a, a);
  } else {
    throw Error("Invalid second column");
  }
}

let totalScore2 = 0;
lines.forEach((line) => {
  if (!line) return;
  let [a, b] = line.split(" ");
  let roundScore = play(a, b);
  totalScore2 += roundScore;
});

console.log("Part 2:", totalScore2);
