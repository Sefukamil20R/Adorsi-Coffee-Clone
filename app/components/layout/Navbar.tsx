"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../common/Container";
import { useCart } from "../cart/CartContext";

const links = [
  { name: "About Us", href: "/#about" },
  { name: "Signature", href: "/#signature" },
  { name: "Visit", href: "/#visit" },
  { name: "Shop", href: "/shop" },
  { name: "Menu", href: "/menu" },
  { name: "Events", href: "/events" },
  { name: "News", href: "/news" },
];

export default function Navbar() {
  const [isHero, setIsHero] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, openDrawer } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsHero(window.scrollY < window.innerHeight - 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    const hash = window.location.hash.slice(1);

    if (hash) {
      requestAnimationFrame(() => {
        const target = document.getElementById(hash);

        if (target) {
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - 80,
            behavior: "auto",
          });
        }
      });
    }

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleHomeAnchor = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (window.location.pathname !== "/") {
      setMenuOpen(false);
      return;
    }

    event.preventDefault();

    const target = document.getElementById(href.slice(2));

    if (target) {
      window.history.pushState(null, "", href);

      window.scrollTo({
        top: target.getBoundingClientRect().top + window.scrollY - 80,
        behavior: "smooth",
      });

      setMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isHero
          ? "bg-transparent"
          : "bg-[var(--blue-black)] backdrop-blur-sm"
      }`}
    >
      <Container className="flex h-20 items-center justify-between max-lg:h-[72px]">
        <Link href="/" onClick={() => setMenuOpen(false)}>
          <Image
            src="/logo/logo.png"
            alt="Adorsi"
            width={118}
            height={38}
            className="h-auto w-[118px] max-lg:w-[95px]"
            style={{ height: "auto" }}
            priority
          />
        </Link>

        <div className="hidden items-center gap-9 lg:flex">
          {links.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={
                item.href.startsWith("/#")
                  ? (event) => handleHomeAnchor(event, item.href)
                  : undefined
              }
              className="text-white text-[14px] font-normal transition-all duration-200 hover:font-semibold"
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5 max-lg:relative max-lg:z-10 max-lg:gap-[13px]">
          <button
            type="button"
            onClick={openDrawer}
            className="relative cursor-pointer max-lg:flex max-lg:items-center max-lg:justify-center"
            aria-label="Cart"
          >
            <Image
              src="/logo/cart.svg"
              alt="Cart"
              width={22}
              height={22}
              className="brightness-0 invert max-lg:h-[18px] max-lg:w-[18px]"
            />
            {itemCount > 0 ? (
              <span className="absolute -right-1.5 -top-1.5 flex h-[16px] min-w-[16px] items-center justify-center rounded-full bg-[var(--gold)] px-1 font-inter text-[10px] font-semibold leading-none text-[#1D2636] max-lg:-right-1 max-lg:-top-1 max-lg:h-[14px] max-lg:min-w-[14px] max-lg:text-[9px]">
                {itemCount}
              </span>
            ) : null}
          </button>

          <Link
            href="/menu"
            className="rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-medium text-black transition hover:opacity-90 max-lg:hidden"
          >
            Order Now
          </Link>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="hidden h-[25px] w-[25px] items-center justify-center max-lg:flex"
          >
            <span className="flex w-[20px] flex-col gap-[4px]">
              <span className="h-[1.5px] w-full bg-[#F2F0EA]" />
              <span className="h-[1.5px] w-full bg-[#F2F0EA]" />
              <span className="h-[1.5px] w-full bg-[#F2F0EA]" />
            </span>
          </button>
        </div>
      </Container>

      <div
        className={`overflow-hidden border-t border-[#344056] transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[var(--blue-black)] px-6 py-5 max-md:px-6">
          <div className="flex flex-col gap-5">
            {links.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={
                  item.href.startsWith("/#")
                    ? (event) => handleHomeAnchor(event, item.href)
                    : () => setMenuOpen(false)
                }
                className="font-inter text-[18px] leading-none text-[#F2F0EA]"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}