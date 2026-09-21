import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Container from "../common/Container";

export default function Hero() {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/hero/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Left Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(29,38,54,0.96) 0%, rgba(29,38,54,0.88) 28%, rgba(29,38,54,0.60) 52%, rgba(29,38,54,0.15) 100%)",
        }}
      />

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center">
        <Container>
          <div className="max-w-2xl pt-60 lg:pt-72">
            <h1 className="font-heading text-6xl leading-[1.04] text-white md:text-[86px]">
              Welcome to{" "}
              <span className="text-[var(--gold)]">Adorsi</span>
              <br />
              <span className="text-[var(--gold)]">Coffee.</span>
            </h1>

            <p className="mt-7 max-w-lg text-[16px] leading-8 text-white/85">
              Adorsi Coffee is committed to delivering exceptional Ethiopian
              specialty coffee to coffee lovers across Ethiopia and around the
              world.
            </p>

            <div className="mt-9 flex gap-5">
              <button className="flex items-center gap-2 rounded-full bg-[var(--gold)] px-6 py-2.5 text-[15px] font-medium text-black transition hover:opacity-90">
                Order Online
                <ArrowRight size={17} />
              </button>

              <Link
                href="/#source"
                className="rounded-full border border-[var(--gold)] px-6 py-2.5 text-[15px] font-medium text-[var(--gold)] transition hover:bg-[var(--gold)] hover:text-black"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}