import NewsCard from "@/components/common/NewsCard";
import Link from "next/link";
import Container from "../common/Container";

export default function Community() {
  return (
    <section className="bg-[#283347]">
      <Container className="py-[68px]">
        {/* Section introduction */}
        <div>
          <div className="mb-7 flex items-center gap-3">
            <span className="h-px w-[34px] bg-[#B89A67]" />

            <span className="font-inter text-[10px] font-medium uppercase tracking-[0.28em] text-[#B89A67]">
              Community
            </span>
          </div>

          <h2 className="font-cormorant text-[40px] leading-none text-[#F2F0EA] sm:text-[42px] max-md:text-[34px]">
            Events & updates
          </h2>

          <p className="mt-6 w-full max-w-[570px] font-inter text-[15px] leading-[1.65] text-[#C7CFD8] max-md:max-w-full max-md:leading-[1.55]">
            Join us for tastings and workshops, and follow news from the Adorsi
            coffee community.
          </p>
        </div>

        {/* Upcoming events */}
        <div className="mt-[58px]">
          <div className="mb-7 flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-3">
            <h3 className="font-cormorant text-[25px] leading-none text-[#F2F0EA] max-md:text-[22px]">
              Upcoming events
            </h3>

            <Link
              href="/events"
              className="font-inter text-[11px] text-[#B89A67] transition-opacity hover:opacity-70"
            >
              View all events →
            </Link>
          </div>

          <div className="flex min-h-[185px] w-full items-center justify-center rounded-[14px] border border-[#344056] bg-[#242E41] px-6 py-10 text-center">
            <div>
              <h4 className="font-cormorant text-[17px] text-[#F2F0EA]">
                No upcoming events yet
              </h4>

              <p className="mx-auto mt-2 max-w-[410px] font-inter text-[12px] leading-[1.45] text-[#8F99A9]">
                We&apos;re planning tastings, workshops, and community
                gatherings.
                <br className="max-md:hidden" />
                Check back soon.
              </p>

              <Link
                href="/events"
                className="mt-5 inline-block font-inter text-[11px] text-[#B89A67] transition-opacity hover:opacity-70"
              >
                Browse events →
              </Link>
            </div>
          </div>
        </div>

        {/* Latest news */}
        <div className="mt-[84px]">
          <div className="mb-7 flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-3">
            <h3 className="font-cormorant text-[25px] leading-none text-[#F2F0EA] max-md:text-[22px]">
              Latest news
            </h3>

            <Link
              href="/news"
              className="font-inter text-[11px] text-[#B89A67] transition-opacity hover:opacity-70"
            >
              View all news →
            </Link>
          </div>

          <NewsCard
            category="Announcement"
            date="Jul 13, 2026"
            title="The best coffee shops in Addis"
            href="/news/the-best-coffee-shops-in-addis"
          />
        </div>
      </Container>
    </section>
  );
}