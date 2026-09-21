import Image from "next/image";
import Container from "../common/Container";

export default function About() {
  return (
    <section
      id="about"
      className="bg-[var(--blue-black)] py-24 lg:py-28"
    >
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Image */}
          <div className="relative overflow-visible">
            <Image
              src="/about/about.webp"
              alt="Adorsi Coffee Interior"
              width={720}
              height={520}
              className="h-[430px] w-full rounded-[28px] object-cover object-left shadow-2xl"
            />

            {/* Best in the City Card */}
            <div className="absolute -bottom-5 right-0 scale-90 origin-bottom-right rounded-[18px] bg-[var(--gold)] px-7 py-6 shadow-xl">
  <p className="font-heading text-[20px] leading-tight text-[var(--blue-black)]">
    Best in
    <br />
    the City.
  </p>
</div>
          </div>

          {/* Right Content */}
          <div>
            {/* Section Label */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-[var(--gold)]" />
              <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--gold)]">
                About Us
              </p>
            </div>

            {/* Title */}
            <h2 className="font-heading text-[46px] leading-[1.18] text-white">
              Coffee is not a drink.
              <br />
              <span className="text-[var(--gold)]">
                It is a ceremony.
              </span>
            </h2>

            {/* Description */}
            <div className="mt-8 space-y-7 text-[16px] leading-8 text-[#C7CFD8]">
              <p>
                ADORSI Coffee epitomizes luxury coffee in Ethiopia, setting new
                standards with its premium quality, exclusive experience, and
                dedication to excellence.
              </p>

              <p>
                ADORSI Coffee embodies Ethiopian coffee heritage while presenting
                a sophisticated, exclusive, and quality-focused coffee experience
                for discerning patrons.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}