"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";

export type MenuFilterOption = {
  value: string;
  label: string;
};

type MenuFilterDropdownProps = {
  id: string;
  ariaLabel: string;
  value: string;
  options: MenuFilterOption[];
  onChange: (value: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  shellClassName: string;
  lead?: ReactNode;
};

export default function MenuFilterDropdown({
  id,
  ariaLabel,
  value,
  options,
  onChange,
  isOpen,
  onOpenChange,
  shellClassName,
  lead,
}: MenuFilterDropdownProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const selected = options.find((o) => o.value === value) ?? options[0];

  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node | null;
      if (rootRef.current && target && !rootRef.current.contains(target)) {
        onOpenChange(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [isOpen, onOpenChange]);

  return (
    <div ref={rootRef} className={`relative ${shellClassName}`}>
      <button
        type="button"
        id={id}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listboxId}
        onClick={() => onOpenChange(!isOpen)}
        className="flex h-[53px] w-full min-w-0 items-center justify-between rounded-full border border-[#435068] bg-[#283347] px-[22px] font-inter text-[15px] text-[#F2F0EA] outline-none max-md:h-[44px] max-md:px-[18px] max-md:text-[14px]"
      >
        <span className="flex min-w-0 flex-1 items-center gap-[12px] max-md:gap-[10px]">
          {lead}
          <span className="truncate text-left">{selected?.label}</span>
        </span>
        <Chevron open={isOpen} />
      </button>

      {isOpen ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={id}
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-[min(360px,60vh)] overflow-y-auto border border-[#5A6B85] bg-[#283347] py-1 shadow-[0_12px_32px_rgba(0,0,0,0.45)]"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <li key={option.value} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value);
                    onOpenChange(false);
                  }}
                  className={`w-full px-4 py-2.5 text-left font-inter text-[15px] leading-snug transition-colors max-md:text-[14px] ${
                    isSelected
                      ? "bg-[#2B6CB0] text-[#F2F0EA]"
                      : "text-[#F2F0EA] hover:bg-[#334155]"
                  }`}
                >
                  {option.label}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 text-[#8995A9] transition-transform ${open ? "rotate-180" : ""}`}
      aria-hidden="true"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
