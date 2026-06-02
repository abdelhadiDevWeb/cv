"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";

const fullName = "Mohamed Abdelhadi Boudjemline";
const role = "Cybersecurity Enthusiast · Web & App Developer";
const website = "https://www.boudjemlineabdelhadi.com";
const email = "boudjemline.mohamed.abdelhadi@gmail.com";
const phone = "0562232628";
const cvPath = "/cv_boudjemline";
const cvDownloadPath = "/api/download-cv";
const cvDownloadFilename = "Mohamed_Boudjemline_CV.pdf";
const profileImg = "/image.jpg";
const qrImg = "/qr-code.png";

export default function Home() {
  const [shareOpen, setShareOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDownloadCv = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (downloading) return;
    setDownloading(true);
    try {
      const res = await fetch(cvDownloadPath);
      if (!res.ok) throw new Error("CV not found");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = cvDownloadFilename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.location.href = cvDownloadPath;
    } finally {
      setDownloading(false);
    }
  };

  const encodedShare = useMemo(() => {
    if (!mounted) {
      return {
        url: "",
        whatsapp: "",
        telegram: "",
        mailto: "",
      };
    }
    const origin =
      typeof window !== "undefined" ? window.location.origin : "";
    const url = `${origin}${cvPath}`;
    const text = encodeURIComponent(
      `Here's my CV (${fullName}). You can view or download it here: ${url}`
    );
    const encodedUrl = encodeURIComponent(url);
    return {
      url,
      whatsapp: `https://wa.me/?text=${text}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${text}`,
      mailto: `mailto:${email}?subject=${encodeURIComponent(
        `${fullName} — CV`
      )}&body=${text}`,
    };
  }, [mounted]);

  return (
    <div className="h-dvh flex items-center justify-center bg-gradient-to-b from-white to-zinc-100 px-2.5 sm:px-3 py-4 sm:py-6 md:py-12 dark:from-zinc-950 dark:to-zinc-900">
      <motion.main
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[22rem] sm:max-w-md rounded-3xl border border-zinc-200/70 bg-white/80 p-3.5 sm:p-4 md:p-5 backdrop-blur-xl dark:border-zinc-700/60 dark:bg-zinc-900/70"
      >
        <div className="flex flex-col items-center gap-3 md:gap-4 text-center">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="relative h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 overflow-hidden rounded-full ring-4 ring-zinc-100 shadow-lg dark:ring-zinc-800"
          >
            <Image src={profileImg} alt={fullName} fill sizes="112px" />
          </motion.div>

          <div className="space-y-0.5 md:space-y-1">
            <h1 className="text-[1.2rem] sm:text-[1.4rem] md:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white">
              {fullName}
            </h1>
            <p className="text-[0.72rem] sm:text-xs md:text-sm text-zinc-600 dark:text-zinc-400">{role}</p>
          </div>

          <motion.div
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.45 }}
            className="w-full rounded-2xl bg-zinc-50 p-2 sm:p-2.5 md:p-3 text-[0.7rem] sm:text-xs md:text-sm text-zinc-700 ring-1 ring-zinc-200 dark:bg-zinc-800/60 dark:text-zinc-300 dark:ring-zinc-700"
          >
            🔥 Looking for <span className="font-semibold">Internship in Network</span>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              show: { transition: { staggerChildren: 0.08 } },
            }}
            className="grid w-full gap-3"
          >
            <motion.a
              variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              href={cvDownloadPath}
              download={cvDownloadFilename}
              onClick={handleDownloadCv}
              aria-busy={downloading}
              className="group inline-flex w-full items-center justify-center gap-2.5 sm:gap-3 rounded-xl bg-blue-600 px-3.5 sm:px-4 md:px-5 py-2.5 sm:py-3 text-[0.85rem] sm:text-sm text-white shadow hover:bg-blue-700 active:bg-blue-800 disabled:opacity-70"
            >
              <Image src="/file.svg" alt="file" width={18} height={18} className="opacity-90" />
              <span className="font-medium">
                {downloading ? "Downloading…" : "Download My CV (PDF)"}
              </span>
            </motion.a>

            {/* Send (share options) */}
            <motion.div
              variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              className="w-full"
            >
              <button
                onClick={() => setShareOpen((v) => !v)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 text-[0.85rem] sm:text-sm font-medium text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                aria-expanded={shareOpen}
              >
                {/* send icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="opacity-90">
                  <path d="M3 11.5l17-8-7.5 17-2.5-6-7-3z" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
                Send CV
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  className={`transition-transform ${shareOpen ? "rotate-180" : ""}`}
                  fill="none"
                >
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <motion.div
                initial={false}
                animate={{ height: shareOpen ? "auto" : 0, opacity: shareOpen ? 1 : 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                {mounted ? (
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    <a
                      href={encodedShare.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-green-600 px-3 py-2 text-[0.8rem] sm:text-xs md:text-sm text-white hover:bg-green-700"
                    >
                      WhatsApp
                    </a>
                    <a
                      href={encodedShare.telegram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-lg bg-sky-600 px-3 py-2 text-[0.8rem] sm:text-xs md:text-sm text-white hover:bg-sky-700"
                    >
                      Telegram
                    </a>
                    <a
                      href={encodedShare.mailto}
                      className="inline-flex items-center justify-center rounded-lg bg-zinc-900 px-3 py-2 text-[0.8rem] sm:text-xs md:text-sm text-white hover:bg-black dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
                    >
                      Email
                    </a>
                  </div>
                ) : null}
              </motion.div>
            </motion.div>

            <motion.div
              variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              className="grid grid-cols-1 gap-3"
            >
              <a
                href={website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 rounded-xl border border-zinc-200 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                <Image src="/globe.svg" alt="web" width={18} height={18} />
                <span className="font-medium">Visit My Portfolio</span>
              </a>
            </motion.div>

            <motion.div
              variants={{ hidden: { y: 10, opacity: 0 }, show: { y: 0, opacity: 1 } }}
              className="grid grid-cols-1 gap-2"
            >
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                {email}
              </a>
              <a
                href={`tel:${phone}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 text-sm text-zinc-900 transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
              >
                Call {phone}
              </a>
            </motion.div>

          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="mt-2 md:mt-4 flex w-full flex-col items-center gap-2 rounded-2xl bg-zinc-50 p-3 sm:p-4 ring-1 ring-zinc-200 dark:bg-zinc-800/60 dark:ring-zinc-700"
          >
            <Image
              src={qrImg}
              alt="QR to connect"
              width={140}
              height={140}
              className="rounded-xl border border-zinc-200 p-2 dark:border-zinc-700"
            />
            <p className="text-[0.72rem] sm:text-xs md:text-sm text-zinc-600 dark:text-zinc-400">
              Scan the QR code to visit my website
            </p>
          </motion.div>
        </div>
      </motion.main>
    </div>
  );
}
