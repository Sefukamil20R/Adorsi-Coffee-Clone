export default function AskBaristaAI() {
  return (
    <button
      type="button"
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
  );
}