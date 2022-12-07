import { size } from "lodash-es";
import fs from "node:fs";

let lines = fs.readFileSync("./07-input.txt", "utf8").split("\n");

function buildFileSystem() {
  let filesystem = {
    type: "dir",
    name: "/",
    items: [],
    size: 0,
  };
  let pointer = filesystem;

  let i = 0;
  while (i < lines.length) {
    let line = lines[i++];
    if (line.startsWith("$")) {
      let [, cmd, arg] = line.split(" ");
      if (cmd === "cd") {
        if (arg === "/") {
          pointer = filesystem;
          continue;
        } else if (arg === "..") {
          pointer = pointer.parent;
        } else {
          let item = pointer?.items.find((item) => item.name === arg);
          if (item) {
            pointer = item;
            continue;
          } else {
            throw new Error("Could not find item " + arg);
          }
        }
      } else if (cmd === "ls") {
        continue;
      } else {
        throw new Error("Bad command");
      }
    } else {
      let [deets, name] = line.split(" ");
      if (deets === "dir") {
        pointer.items.push({
          type: "dir",
          name,
          size: 0,
          items: [],
          parent: pointer,
        });
      } else {
        deets = Number(deets);
        pointer.items.push({ type: "file", name, size: deets });

        // Add file size to all ancestor directory sizes
        let tempPointer = pointer;
        do {
          tempPointer.size += deets;
        } while ((tempPointer = tempPointer.parent));
      }
    }
  }

  return filesystem;
}

function flattenDirs(pointer, parentPath) {
  return pointer.items
    .filter((i) => i.type === "dir")
    .reduce(
      (acc, item) => {
        let path = [parentPath, item.name].join("/");
        return [...acc, { path, size: item.size }, ...flattenDirs(item, path)];
      },
      parentPath ? [] : [{ path: pointer.name, size: pointer.size }]
    );
}

let filesystem = buildFileSystem();
let flattened = flattenDirs(filesystem);
let sum = flattened
  .filter((dir) => dir.size <= 100000)
  .reduce((acc, dir) => acc + dir.size, 0);

console.log("Part 1:", sum);

let freeSpace = 70000000 - filesystem.size;
let neededSpace = 30000000 - freeSpace;
let part2Dir = flattened
  .sort((a, b) => a.size - b.size)
  .find((dir) => dir.size >= neededSpace);

console.log("Part 2:", part2Dir.size);
