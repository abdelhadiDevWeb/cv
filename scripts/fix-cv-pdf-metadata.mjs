import { readFile, writeFile } from "fs/promises";
import path from "path";
import { PDFDocument } from "pdf-lib";

const OLD_TITLE = "Blue and Gray Simple Professional CV Resume";
const NEW_TITLE = "cv_boudjemline".padEnd(OLD_TITLE.length, " ");

const cvPath = path.join(process.cwd(), "public", "cv_boudjemline.pdf");

const bytes = await readFile(cvPath);
const pdf = await PDFDocument.load(bytes, { updateMetadata: true });

pdf.setTitle("cv_boudjemline");
pdf.setSubject("");
pdf.setKeywords([]);
pdf.setCreator("");
pdf.setProducer("");

const viewerPrefs = pdf.catalog.getOrCreateViewerPreferences();
viewerPrefs.setDisplayDocTitle(false);

let updated = Buffer.from(await pdf.save());

// pdf-lib may not update XMP; replace remaining Canva title strings in-place (same length).
const oldBuf = Buffer.from(OLD_TITLE, "utf8");
const newBuf = Buffer.from(NEW_TITLE, "utf8");
let count = 0;
let offset = 0;
while (offset < updated.length) {
  const idx = updated.indexOf(oldBuf, offset);
  if (idx === -1) break;
  newBuf.copy(updated, idx);
  count += 1;
  offset = idx + oldBuf.length;
}

await writeFile(cvPath, updated);
console.log(
  `PDF metadata updated (replaced ${count} embedded title string${count === 1 ? "" : "s"}).`
);
