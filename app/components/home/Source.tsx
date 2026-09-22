import Image from "next/image";
import Container from "../common/Container";

export default function Source() {
  return (
    <section id="source" className="bg-[#1D2636]">
      <Container className="flex min-h-screen items-center py-[100px]">
        <div className="flex w-full items-center justify-center gap-[45px] max-lg:flex-col max-lg:items-start max-lg:justify-start">
          {/* Left content */}
          <div className="w-[570px] shrink-0 max-lg:w-full">
            <div className="mb-[34px] flex items-center gap-[16px]">
              <span className="h-px w-[48px] bg-[#B89A67]" />

              <span className="font-inter text-[12px] font-medium uppercase tracking-[0.34em] text-[#B89A67]">
                The Source
              </span>
            </div>

            <h2 className="font-cormorant text-[46px] font-medium leading-[1.08] tracking-[-0.02em] text-[#F4F1EC] max-md:text-[36px] max-md:leading-[1.1]">
              Every Cup Tells a Story.
            </h2>

            {/* Description */}
            <p className="mt-[40px] w-[670px] max-w-none font-inter text-[18px] font-normal leading-[1.55] text-[#BABABB] max-lg:w-full max-lg:max-w-full max-md:w-full max-md:max-w-full max-md:text-[16px] max-md:leading-[1.55]">
              Ethiopian coffee, reimagined sourced from the root, roasted with
              <br className="max-md:hidden" />
              intention, and poured with pride. From the highlands where it
              <br className="max-md:hidden" />
              grows to the cup in your hands, Adorsi brings you closer to the
              <br className="max-md:hidden" />
              bean you&apos;ve always loved but never truly knew.
            </p>

            <p className="mt-[28px] font-inter text-[17px] font-semibold leading-[1.4] text-[#B89A67]">
              Adorsi Coffee Ethiopian Roasting, Reimagined.
            </p>

            <a
              href="/shop"
              className="mt-[44px] flex h-[46px] w-[215px] items-center justify-center rounded-[6px] bg-[#B89A67] font-inter text-[13px] font-medium uppercase tracking-[0.12em] text-[#1D2636] transition-opacity duration-200 hover:opacity-90"
            >
              Go to Shop Page
            </a>
          </div>

          {/* Right image */}
          <div className="relative h-[420px] w-[560px] shrink-0 overflow-hidden rounded-[26px] border border-[#B89A67]/30 max-lg:h-auto max-lg:aspect-[4/3] max-lg:w-full max-md:aspect-[1.46]">
            <Image
              src="/source/source.png"
              alt="Adorsi Ethiopian coffee"
              fill
              sizes="560px"
              className="object-cover max-md:object-contain"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}