import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NewsPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#1D2636]">
        <section>
      <div className="mx-auto w-full max-w-[1140px] px-6 pb-[185px] pt-[170px] sm:px-8 lg:px-0">            {/* HEADER */}
            <div>
              <div className="flex items-center gap-[14px]">
                <span className="h-px w-[43px] bg-[#B89A67]" />

                <span className="font-inter text-[9px] font-medium uppercase tracking-[0.3em] text-[#B89A67]">
                  Community
                </span>
              </div>

              <h1 className="mt-[37px] font-cormorant text-[50px] leading-[0.95] text-[#F2F0EA]">
                News &amp; Updates
              </h1>

              <p className="mt-[30px] max-w-[800px] font-inter text-[17px] leading-[1.55] text-[#C7CFD8]">
                Coffee insights, event recaps, industry news, and stories from
                our experience
                <br className="hidden sm:block" />
                at Adorsi.
              </p>
            </div>

            {/* NEWS CARD */}
            <div className="mt-[68px]">
              <article className="w-full max-w-[441px] rounded-[17px] border border-[#344056] px-[38px] py-[38px]">
                <div className="flex items-center gap-[14px]">
                  <span className="font-inter text-[10px] font-medium uppercase tracking-[0.25em] text-[#B89A67]">
                    Announcement
                  </span>

                  <span className="font-inter text-[10px] font-medium uppercase tracking-[0.25em] text-[#7E899B]">
                    Jul 13, 2026
                  </span>
                </div>

                <h2 className="mt-[21px] font-cormorant text-[27px] leading-[1.05] text-[#F2F0EA]">
                  The best coffee shops in Addis
                </h2>

                <Link
                  href="/news/the-best-coffee-shops-in-addis"
                  className="mt-[24px] inline-block font-inter text-[14px] text-[#B89A67] transition-opacity hover:opacity-80"
                >
                  Read more →
                </Link>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}