import Image from "next/image";
import Container from "../common/Container";

const drinks = [
  {
    name: "Adorsi Anaerobic",
    subtitle: "Yirgacheffe · Aricha · Anaerobic",
    price: "500 ETB",
  },
  {
    name: "Sky Latte (Iced)",
    subtitle: "Espresso · Milk · Blue Cloud",
    price: "510 ETB",
  },
  {
    name: "Ube Coconut Cloud",
    subtitle: "Purple yam · Coconut · Vanilla",
    price: "670 ETB",
  },
];

export default function Signature() {
  return (
    <section id="signature" className="bg-[var(--blue-black)] py-24">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-[0.82fr_1.18fr]">
         {/* Left Image */}
<div className="relative mt-8 flex justify-start max-lg:justify-center">
  <div className="rounded-[30px] border border-[var(--gold)]/30 p-[1px] max-lg:w-full max-lg:max-w-[455px]">
    <Image
      src="/signature/signature.webp"
      alt="Adorsi Signature Interior"
      width={565}
      height={680}
      className="h-[540px] w-[455px] rounded-[29px] object-cover max-lg:h-auto max-lg:w-full max-md:object-contain"
    />
  </div>
</div>

          {/* Right Content */}
          <div>
            {/* Label */}
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-10 bg-[var(--gold)]" />
              <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--gold)]">
                Signature Series
              </p>
            </div>

            {/* Title */}
            <h2 className="font-heading text-[60px] leading-[1.08] text-white max-lg:text-[48px] max-md:text-[40px]">
              Three pours.
              <br />
              <span className="text-[var(--gold)]">Three rituals.</span>
            </h2>

            {/* Description */}
            <p className="mt-7 w-full max-w-[520px] text-[16px] leading-8 text-[#C7CFD8] max-md:max-w-full max-md:text-[15px] max-md:leading-7">
              From single-origin filter to cloud-light signature lattes three
              drinks that define the Adorsi bar. Order them solo, or as a
              flight.
            </p>

            {/* Drinks */}
            <div className="mt-9">
              {drinks.map((drink, index) => (
                <div
                  key={drink.name}
                  className={`group py-5 ${
                    index !== drinks.length - 1
                      ? "border-b border-white/10"
                      : ""
                  }`}
                >
                  <div className="flex items-start justify-between max-md:gap-3">
                    <div>
                      <h3 className="font-heading text-[24px] text-white transition-colors duration-300 group-hover:text-[var(--gold)]">
                        {drink.name}
                      </h3>

                      <p className="mt-1 text-[15px] text-white/55">
                        {drink.subtitle}
                      </p>
                    </div>

                    <span className="font-heading text-[17px] font-normal tracking-wide whitespace-nowrap">
                      <span className="text-[var(--gold)]">
                        {drink.price.split(" ")[0]}
                      </span>{" "}
                      <span className="text-[14px] font-normal text-white/75">
                        ETB
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}