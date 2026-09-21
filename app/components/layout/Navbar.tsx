"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "../common/Container";
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
    if (window.location.pathname !== "/") return;

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
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        isHero
          ? "bg-transparent"
          : "bg-[var(--blue-black)] backdrop-blur-sm"
      }`}
    >
      <Container className="flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/logo/logo.png"
            alt="Adorsi"
            width={118}
            height={38}
            className="h-auto"
            priority
          />
        </Link>

        {/* Center Links */}
        <div className="hidden lg:flex items-center gap-9">
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

        {/* Right Side */}
        <div className="flex items-center gap-5">
          <button className="cursor-pointer">
            <Image
              src="/logo/cart.svg"
              alt="Cart"
              width={22}
              height={22}
              className="brightness-0 invert"
            />
          </button>

          <Link
            href="/menu"
            className="rounded-full bg-[var(--gold)] px-6 py-3 text-sm font-medium text-black transition hover:opacity-90"
          >
            Order Now
          </Link>
        </div>
      </Container>
    </nav>
  );
}