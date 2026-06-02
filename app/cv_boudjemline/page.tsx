import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "cv_boudjemline",
};

export default function CvBoudjemlinePage() {
  return (
    <iframe
      src="/cv_boudjemline.pdf"
      className="fixed inset-0 size-full border-0"
      title="cv_boudjemline"
    />
  );
}
