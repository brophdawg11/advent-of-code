#!/bin/bash

touch "${1}-input.txt"

echo "import fs from \"node:fs\";" >> "${1}.mjs"
echo "" >> "${1}.mjs"
echo "let lines = fs.readFileSync(\"./${1}-input.txt\", \"utf8\").split(\"\n\");" >> "${1}.mjs"
echo "" >> "${1}.mjs"
echo "console.log(\"Part 1:\");" >> "${1}.mjs"
echo "console.log(\"Part 2:\");" >> "${1}.mjs"
