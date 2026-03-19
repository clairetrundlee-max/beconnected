/**
 * After `next build` with output: "standalone", copy assets so the server can run
 * from `.next/standalone` alone.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const standalone = path.join(root, ".next", "standalone");
const nextStatic = path.join(root, ".next", "static");
const targetStatic = path.join(standalone, ".next", "static");

if (!fs.existsSync(standalone)) {
  console.error("Missing .next/standalone — run: npm run build");
  process.exit(1);
}
if (!fs.existsSync(nextStatic)) {
  console.error("Missing .next/static — run: npm run build");
  process.exit(1);
}

fs.mkdirSync(path.dirname(targetStatic), { recursive: true });
fs.cpSync(nextStatic, targetStatic, { recursive: true });

const pub = path.join(root, "public");
const targetPub = path.join(standalone, "public");
if (fs.existsSync(pub) && fs.readdirSync(pub).length > 0) {
  fs.cpSync(pub, targetPub, { recursive: true });
} else {
  fs.mkdirSync(targetPub, { recursive: true });
}

console.log("\n✓ Build output ready at: .next/standalone");
console.log("  Run from project root:\n    cd .next/standalone && node server.js");
console.log("  Then open http://localhost:3000\n");
