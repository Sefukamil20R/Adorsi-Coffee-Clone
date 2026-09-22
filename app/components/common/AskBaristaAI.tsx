"use client";

import { useEffect, useState } from "react";

const moodChips = [
  { emoji: "😴", label: "Tired" },
  { emoji: "🤯", label: "Stressed" },
  { emoji: "😄", label: "Happy" },
  { emoji: "💙", label: "A bit down" },
  { emoji: "🔥", label: "Need focus" },
];

const quickQuestions = [
  { emoji: "🕒", label: "Hours" },
  { emoji: "📍", label: "Location" },
  { emoji: "📞", label: "Contact" },
  { emoji: "🎟️", label: "Events" },
  { emoji: "🌿", label: "Fasting" },
  { emoji: "🍵", label: "Ceremony" },
];

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BaristaAvatar({ size = "sm" }: { size?: "sm" | "lg" }) {
  const isLarge = size === "lg";

  return (
    <span
      className={`flex shrink-0 items-center justify-center rounded-full bg-[#B89A67] ${
        isLarge ? "h-9 w-9" : "h-8 w-8"
      }`}
    >
      <span
        className={`font-cormorant font-medium leading-none text-[#1D2636] ${
          isLarge ? "text-[18px]" : "text-[16px]"
        }`}
      >
        A
      </span>
    </span>
  );
}

function BaristaDialog({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 max-md:px-4 max-md:py-6">
      <button
        type="button"
        aria-label="Close Barista AI"
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="barista-ai-title"
        className="relative flex max-h-[min(640px,calc(100vh-32px))] w-full max-w-[420px] flex-col overflow-hidden rounded-[16px] border border-[#344056] bg-[#1D2636] shadow-[0_24px_80px_rgba(0,0,0,0.45)] max-md:max-h-[min(640px,calc(100vh-48px))]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#2A3344] px-5 py-4">
          <div className="flex min-w-0 items-start gap-3">
            <BaristaAvatar size="lg" />
            <div className="min-w-0 pt-0.5">
              <h2
                id="barista-ai-title"
                className="font-heading text-[20px] leading-tight text-[#F2F0EA]"
              >
                Barista AI
              </h2>
              <p className="mt-1 font-inter text-[11px] leading-snug text-[var(--gold)]">
                Tell me your mood I&apos;ll find your cup
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#8995A9] transition hover:bg-white/5 hover:text-[#F2F0EA]"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5">
          <div className="rounded-[12px] border border-[#344056] bg-[#283347] px-4 py-3.5">
            <p className="font-inter text-[13px] leading-[1.55] text-[#C7CFD8]">
              Hi! I&apos;m your Barista AI ☕ Tell me your mood or what
              you&apos;re craving I&apos;ll recommend items and open the menu
              for you.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {moodChips.map((chip) => (
              <button
                key={chip.label}
                type="button"
                className="rounded-full border border-[#344056] bg-[#283347] px-3 py-1.5 font-inter text-[12px] text-[#C7CFD8] transition hover:border-[#435068]"
              >
                {chip.emoji} {chip.label}
              </button>
            ))}
          </div>

          <p className="mt-5 font-inter text-[10px] font-medium uppercase tracking-[0.14em] text-[#6B778A]">
            Quick questions
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {quickQuestions.map((item) => (
              <button
                key={item.label}
                type="button"
                className="rounded-full border border-[#344056] bg-[#283347] px-3 py-1.5 font-inter text-[12px] text-[#C7CFD8] transition hover:border-[#435068]"
              >
                {item.emoji} {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="border-t border-[#2A3344] px-5 py-4">
          <div className="flex items-center gap-2 rounded-full border border-[#344056] bg-[#283347] py-1.5 pl-4 pr-1.5">
            <input
              type="text"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="How are you feeling?"
              className="min-w-0 flex-1 bg-transparent font-inter text-[13px] text-[#F2F0EA] placeholder:text-[#6B778A] outline-none"
            />
            <button
              type="button"
              aria-label="Send message"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--gold)] text-[#1D2636] transition hover:opacity-90"
            >
              <SendIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AskBaristaAI() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          fixed bottom-[20px] left-[20px] z-50
          flex h-[44px] items-center gap-3
          rounded-full border border-[#3C4657]
          bg-[#1D2636]
          px-[10px] pr-[17px]
          shadow-[0_4px_18px_rgba(0,0,0,0.18)]
          transition-all duration-200
          hover:border-[#B89A67]

          max-lg:bottom-[18px]
          max-lg:left-[32px]
          max-lg:h-[44px]
          max-lg:w-[44px]
          max-lg:justify-center
          max-lg:rounded-full
          max-lg:p-0
        "
      >
        <span
          className="
            flex h-[28px] w-[28px]
            items-center justify-center
            rounded-full bg-[#B89A67]

            max-lg:h-[32px]
            max-lg:w-[32px]
          "
        >
          <span
            className="
              font-cormorant text-[16px]
              font-medium leading-none
              text-[#1D2636]

              max-lg:text-[18px]
            "
          >
            A
          </span>
        </span>

        <span className="font-inter text-[12px] font-medium text-[#D5D9DF] max-lg:hidden">
          Ask Barista AI
        </span>
      </button>

      {open ? <BaristaDialog onClose={() => setOpen(false)} /> : null}
    </>
  );
}
