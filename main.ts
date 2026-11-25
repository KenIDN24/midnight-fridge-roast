import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My fridge locks at midnight like the leftovers are state secrets. I pay the power bill and still need clearance for a snack.";

if (LINE.length < 1 || LINE.length > 200) {
  console.error(`entry must be 1-200 characters, got ${LINE.length}`);
  process.exit(1);
}
if (/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/.test(LINE)) {
  console.error("entry must not contain control characters");
  process.exit(1);
}
if (LINE !== LINE.trim() || LINE.includes("\n")) {
  console.error("entry must be a single line with no leading/trailing whitespace");
  process.exit(1);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE + "\n", "utf8");

// Read-back check: the file on disk must match the line exactly.
const onDisk = readFileSync("/output/entry.txt", "utf8");
if (onDisk !== LINE + "\n") {
  console.error("read-back mismatch: entry on disk does not match the line");
  process.exit(1);
}
