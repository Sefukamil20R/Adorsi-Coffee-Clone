import Image from "next/image";
import Container from "../common/Container";

export default function Space() {
  return (
    <section className="bg-[var(--blue-black)] py-24">
      <Container>
        {/* Header */}
        <div className="grid items-end gap-10 lg:grid-cols-[1.08fr_0.92fr]">
          {/* Left */}
          <div className="max-w-[600px] pb-3">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-[var(--gold)]" />
              <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--gold)]">
                THE SPACE
              </p>
            </div>

            <h2 className="font-heading text-[64px] leading-[1.06] text-white max-md:text-[40px] max-md:leading-[1.1]">
              A room shaped
              <br />
              <span className="text-[var(--gold)]">for the cup.</span>
            </h2>
          </div>

          {/* Right */}
          <div className="flex justify-end pb-5 max-lg:justify-start">
            <p className="w-full max-w-[510px] text-[17px] leading-8 text-[#C7CFD8] max-md:max-w-full max-md:text-[15px] max-md:leading-7">
              Marble veining. Warm light. Plants and quiet corners.
              <br className="max-md:hidden" />
              A bar designed to disappear so the coffee and the
              <br className="max-md:hidden" />
              people you share it with can come forward.
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="mt-14 flex justify-center">
          <div className="grid w-full max-w-[1200px] grid-cols-2 gap-5 max-md:grid-cols-1">
            <div className="rounded-[28px] border border-[var(--gold)]/30 p-[1px] max-md:aspect-[3/2] max-md:overflow-hidden">
              <Image
                src="/space/space1.webp"
                alt="Adorsi Space 1"
                width={720}
                height={700}
                className="h-[420px] w-full rounded-[27px] object-cover max-md:h-full max-md:object-contain"
              />
            </div>

            <div className="rounded-[28px] border border-[var(--gold)]/30 p-[1px] max-md:aspect-[3/2] max-md:overflow-hidden">
              <Image
                src="/space/space2.webp"
                alt="Adorsi Space 2"
                width={720}
                height={700}
                className="h-[420px] w-full rounded-[27px] object-cover max-md:h-full max-md:object-contain"
              />
            </div>

            <div className="rounded-[28px] border border-[var(--gold)]/30 p-[1px] max-md:aspect-[3/2] max-md:overflow-hidden">
              <Image
                src="/space/space3.webp"
                alt="Adorsi Space 3"
                width={720}
                height={700}
                className="h-[420px] w-full rounded-[27px] object-cover max-md:h-full max-md:object-contain"
              />
            </div>

            <div className="rounded-[28px] border border-[var(--gold)]/30 p-[1px] max-md:aspect-[2/3] max-md:overflow-hidden">
              <Image
                src="/space/space4.webp"
                alt="Adorsi Space 4"
                width={720}
                height={700}
                className="h-[420px] w-full rounded-[27px] object-cover max-md:h-full max-md:object-contain"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}