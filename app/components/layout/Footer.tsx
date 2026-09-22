"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "../common/Container";

const exploreLinks = [
  { name: "About Us", href: "/#about" },
  { name: "Menu", href: "/menu" },
  { name: "Events", href: "/events" },
  { name: "News", href: "/news" },
  { name: "Signature", href: "/#signature" },
  { name: "Space", href: "/#space" },
];

export default function Footer() {
  const pathname = usePathname();

  const handleHomeAnchor = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (pathname !== "/") return;

    event.preventDefault();

    const target = document.getElementById(href.slice(2));

    if (target) {
      window.history.pushState(null, "", href);

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-[#1D2636]">
      <Container className="pb-[38px] pt-[96px]">
        {/* Upper footer */}
        <div className="grid gap-8 md:grid-cols-[1.65fr_0.75fr_0.9fr]">
          <div>
            <Image
              src="/logo/logo.png"
              alt="Adorsi Specialty Coffee"
              width={86}
              height={25}
              className="h-auto w-[86px] object-contain"
              style={{ height: "auto" }}
            />

            <p className="mt-[24px] max-w-[430px] font-inter text-[14px] leading-[1.55] text-[#9DA7B7]">
              Ethiopian specialty coffee, sourced and roasted
              <br className="hidden sm:block" />
              with intention. Powered by Testi Specialty Coffee.
            </p>
          </div>

          <div>
            <p className="font-inter text-[9px] font-medium uppercase tracking-[0.3em] text-[#B89A67]">
              Explore
            </p>

            <nav className="mt-[19px] flex flex-col gap-[8px]">
              {exploreLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={
                    item.href.startsWith("/#")
                      ? (event) => handleHomeAnchor(event, item.href)
                      : undefined
                  }
                  className="font-inter text-[14px] text-[#A7B0BF] transition-colors hover:text-[#F2F0EA]"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="font-inter text-[9px] font-medium uppercase tracking-[0.3em] text-[#B89A67]">
              Connect
            </p>

            <div className="mt-[19px] flex flex-col gap-[8px]">
              <a
                href="#"
                className="font-inter text-[14px] text-[#A7B0BF] transition-colors hover:text-[#F2F0EA]"
              >
                @adorsicoffee
              </a>

              <a
                href="tel:+251945428888"
                className="font-inter text-[14px] text-[#A7B0BF] transition-colors hover:text-[#F2F0EA]"
              >
                +251 945 428 888
              </a>

              <a
                href="#"
                className="font-inter text-[14px] text-[#A7B0BF] transition-colors hover:text-[#F2F0EA]"
              >
                adorsispecialtycoffee.com
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-[62px] h-px w-full bg-[#2B3547]" />

        {/* Bottom row */}
        <div className="grid grid-cols-[1.65fr_0.75fr_0.9fr] pt-[34px] max-md:flex max-md:flex-col max-md:gap-[18px]">
          <p className="font-inter text-[12px] text-[#748095]">
            © 2026 Adorsi Specialty Coffee
          </p>

          <p className="col-start-3 justify-self-start font-inter text-[12px] text-[#748095]">
            Crafted in Addis Ababa
          </p>
        </div>
      </Container>
    </footer>
  );
}
