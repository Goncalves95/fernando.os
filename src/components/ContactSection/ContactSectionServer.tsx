import fs from "fs";
import path from "path";
import { ContactSection, CV_FILENAME } from "./ContactSection";

export function ContactSectionServer() {
  if (process.env.NODE_ENV !== "production") {
    const cvPath = path.join(process.cwd(), "public", "cv", CV_FILENAME);
    if (!fs.existsSync(cvPath)) {
      console.warn(
        `[ContactSection] CV file not found at public/cv/${CV_FILENAME} — the "Download CV" button will 404.`,
      );
    }
  }

  return <ContactSection />;
}
