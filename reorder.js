
const fs = require("fs");
const file = "src/components/FileEraserPage.tsx";
let content = fs.readFileSync(file, "utf8");

// Markers must match the exact comments in the file
const markers = [
    "STICKY SECTION NAV",
    "HERO SECTION",
    "WHAT YOU CAN ERASE",
    "VIDEO SECTION",
    "HOW IT WORKS",
    "TAMPER PROOF REPORT",
    "COMPLIANCE STANDARDS",
    "PLATFORM SUPPORT",
    "KEY FEATURES",
    "USE CASES",
    "RELATED RESOURCES",
    "ERASURE STANDARDS COMPARISON",
    "DELETE vs FORMAT",
    "FAQ SECTION",
    "ENQUIRY / CTA"
];

let sections = {};
let indices = [];

// Find all indices
markers.forEach(marker => {
    const searchStr = `{/* ================= ${marker}`;
    const idx = content.indexOf(searchStr);
    if (idx !== -1) {
        indices.push({ marker, idx });
    } else {
        console.warn("Could not find marker: " + marker);
    }
});

// Add end of last section
const mainEndIdx = content.lastIndexOf("</main>");
indices.push({ marker: "END", idx: mainEndIdx });

indices.sort((a, b) => a.idx - b.idx);

// Extract sections
for (let i = 0; i < indices.length - 1; i++) {
    const current = indices[i];
    const next = indices[i+1];
    sections[current.marker] = content.substring(current.idx, next.idx);
}

// Reorder requested:
// Hero -> Platforms -> Features -> Erase Types (WHAT YOU CAN ERASE) -> How it Works -> Compliance -> Use Cases -> FAQs -> Contact
const newOrder = [
    "STICKY SECTION NAV",
    "HERO SECTION",
    "PLATFORM SUPPORT",
    "KEY FEATURES",
    "WHAT YOU CAN ERASE",
    "HOW IT WORKS",
    "COMPLIANCE STANDARDS",
    "USE CASES",
    "FAQ SECTION",
    "ENQUIRY / CTA"
];

// Comment out the ones not in newOrder
const commentOutOrder = [
    "VIDEO SECTION",
    "TAMPER PROOF REPORT",
    "RELATED RESOURCES",
    "ERASURE STANDARDS COMPARISON",
    "DELETE vs FORMAT"
];

let newBody = "";
newOrder.forEach(marker => {
    if (sections[marker]) {
        newBody += sections[marker];
    }
});

commentOutOrder.forEach(marker => {
    if (sections[marker]) {
        let sec = sections[marker];
        // If not already commented out with {false && (
        if (!sec.includes("{false && (")) {
            // we will wrap the whole section in {false && ( <> ... </> )}
            // To do this, we need to find the outermost JSX element in this string.
            // Actually, since they are JSX blocks, we can just prepend `{false && (\n<>\n` and append `\n</>\n)}`
            sec = `{false && (\n<>\n` + sec + `\n</>\n)}\n`;
        }
        newBody += sec;
    }
});

const preBody = content.substring(0, indices[0].idx);
const postBody = content.substring(mainEndIdx);

const finalContent = preBody + newBody + postBody;
fs.writeFileSync(file, finalContent, "utf8");
console.log("Reordered successfully!");

