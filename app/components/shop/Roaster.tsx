import Image from "next/image";

export default function Roaster() {
  return (
    <section className="bg-[#1D2636]">
      <div className="mx-auto w-full max-w-[1080px] px-6 pb-[105px] pt-[58px] sm:px-8 lg:px-0">
        {/* Divider */}
        <div className="h-px w-full bg-[#2B3547]" />

        {/* Space after divider before the entire second section */}
   <div className="relative mt-[170px] min-h-[640px]">          {/* LEFT TEXT */}
          <div className="lg:-ml-[65px] lg:w-[650px]">
            <h2 className="font-cormorant text-[49px] leading-[1] text-[#F2F0EA]">
              The Adorsi Roaster
            </h2>

            <div className="mt-[32px] space-y-[27px]">
              {/* Paragraph 1 */}
              <p className="font-inter text-[17px] leading-[1.55] text-[#C5CCD6]">
                <span className="block whitespace-nowrap">
                  Ethiopian coffee, reimagined sourced from the root, roasted with
                </span>
                <span className="block whitespace-nowrap">
                  intention, and poured with pride. From the highlands where it
                </span>
                <span className="block whitespace-nowrap">
                  grows to the cup in your hands, Adorsi brings you closer to the
                </span>
                <span className="block whitespace-nowrap">
                  bean you&apos;ve always loved but never truly knew.
                </span>
              </p>

              {/* Paragraph 2 */}
              <p className="font-inter text-[17px] leading-[1.55] text-[#C5CCD6]">
                <span className="block whitespace-nowrap">
                  At Adorsi, roasting is more than a process, it is a profound
                </span>
                <span className="block whitespace-nowrap">
                  responsibility. We are the custodians of centuries of Ethiopian
                </span>
                <span className="block whitespace-nowrap">
                  coffee heritage, entrusted with the task of honoring the origin
                </span>
                <span className="block whitespace-nowrap">
                  while elevating the experience for the modern palate.
                </span>
              </p>

              {/* Paragraph 3 */}
              <p className="font-inter text-[17px] leading-[1.55] text-[#C5CCD6]">
                <span className="block whitespace-nowrap">
                  Our roasting approach is defined by intention. We do not impose a
                </span>
                <span className="block whitespace-nowrap">
                  predetermined profile onto the beans, rather, we listen to them.
                </span>
                <span className="block whitespace-nowrap">
                  We seek to coax out the inherent symphony of flavors in every
                </span>
                <span className="block whitespace-nowrap">
                  bean.
                </span>
              </p>
            </div>

            {/* Closing statement */}
            <p className="mt-[36px] whitespace-nowrap font-cormorant text-[21px] leading-[1.15] text-[#B89A67]">
              Adorsi Coffee Ethiopian Roasting, Reimagined.
            </p>
          </div>

          {/* RIGHT IMAGE GROUP */}
          <div className="mt-10 w-full lg:absolute lg:right-[-55px] lg:top-[-95px] lg:mt-0 lg:w-[600px]">
            {/* Double Adorsi */}
            <div className="relative h-[430px] w-full overflow-hidden rounded-[20px] border border-[rgba(184,154,103,0.28)] shadow-[0_0_16px_rgba(184,154,103,0.08)]">
              <Image
                src="/shop/doubleadorsi.png"
                alt="Adorsi coffee products"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>

            {/* Bottom two images */}
            <div className="mt-[20px] grid grid-cols-2 gap-[20px]">
              <div className="relative aspect-square overflow-hidden rounded-[20px] border border-[rgba(184,154,103,0.28)] shadow-[0_0_16px_rgba(184,154,103,0.08)]">
                <Image
                  src="/shop/adorsiblue.png"
                  alt="Adorsi blue coffee"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 270px"
                />
              </div>

              <div className="relative aspect-square overflow-hidden rounded-[20px] border border-[rgba(184,154,103,0.28)] shadow-[0_0_16px_rgba(184,154,103,0.08)]">
                <Image
                  src="/shop/adorsiwhite.png"
                  alt="Adorsi white coffee"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 270px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}