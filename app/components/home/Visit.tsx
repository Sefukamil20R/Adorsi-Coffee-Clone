import Container from "../common/Container";

const visitItems = [
  {
    icon: "/visit/location.svg",
    label: "Find us",
    content: (
      <>
        Addis Ababa
        <br />
        adorsispecialtycoffee.com
      </>
    ),
  },
  {
    icon: "/visit/time.svg",
    label: "Hours",
    content: (
      <>
        Open Daily
        <br />
        7:00 to 21:00
      </>
    ),
  },
];

function GoldIcon({
  src,
  size = 23,
}: {
  src: string;
  size?: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="gold-icon-mask block shrink-0"
      style={{
        width: size,
        height: size,
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
      }}
    />
  );
}

export default function Visit() {
  return (
    <section id="visit" className="bg-[#1D2636]">
      <Container className="py-[86px]">
        <div className="text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-[42px] bg-[#B89A67]" />

            <span className="font-inter text-[9px] font-medium uppercase tracking-[0.3em] text-[#B89A67]">
              Visit
            </span>

            <span className="h-px w-[42px] bg-[#B89A67]" />
          </div>

          <h2 className="mt-[32px] font-cormorant text-[46px] leading-none text-[#F2F0EA] sm:text-[50px] max-md:text-[38px]">
            Come pour with us.
          </h2>

          <p className="mt-[27px] w-full font-inter text-[14px] leading-[1.5] text-[#C7CFD8] max-md:text-[13px] max-md:leading-[1.45]">
            We&apos;re open every day. Stay for a quiet morning, or grab and go.
          </p>
        </div>

        <div className="mt-[64px] grid w-full overflow-hidden border border-[#344056] bg-[#283347] md:grid-cols-3">
          {visitItems.map((item) => (
            <div
              key={item.label}
              className="min-h-[250px] border-b border-[#344056] px-[40px] py-[36px] md:border-b-0 md:border-r max-md:px-6 max-md:py-7"
            >
              <GoldIcon src={item.icon} size={23} />

              <p className="mt-[22px] font-inter text-[9px] font-medium uppercase tracking-[0.28em] text-[#929CAC]">
                {item.label}
              </p>

              <div className="mt-[12px] font-cormorant text-[17px] font-normal leading-[1.5] text-[#F2F0EA]">
                {item.content}
              </div>
            </div>
          ))}

          <div className="min-h-[250px] px-[40px] py-[36px] max-md:px-6 max-md:py-7">
            <GoldIcon src="/visit/call.svg" size={23} />

            <p className="mt-[22px] font-inter text-[9px] font-medium uppercase tracking-[0.28em] text-[#929CAC]">
              Reach us
            </p>

            <div className="mt-[12px] font-cormorant text-[17px] font-normal leading-[1.5] text-[#F2F0EA]">
              +251 945 428 888
              <br />
              @adorsicoffee
            </div>

            <div className="mt-[20px] flex items-center gap-3">
              <a
                href="https://www.instagram.com/adorsicoffee?igsh=cTlkazQ0ZWVja2Rv"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#B89A67] bg-[#45484E] transition-opacity hover:opacity-80"
              >
                <GoldIcon src="/visit/ig.svg" size={15} />
              </a>

              <a
                href="https://www.tiktok.com/@adorsicoffee"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-[#B89A67] bg-[#45484E] transition-opacity hover:opacity-80"
              >
                <GoldIcon src="/visit/tiktok.svg" size={15} />
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}