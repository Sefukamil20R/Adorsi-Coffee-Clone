import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";

export default function NewsArticlePage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#1D2636]">
        <section>
          <Container className="pb-[175px] pt-[180px]">
            <div className="max-w-[846px]">
            {/* BACK */}
            <Link
              href="/news"
              className="inline-flex items-center gap-[10px] font-inter text-[14px] text-[#AAB3C1] transition-colors hover:text-[#F2F0EA]"
            >
              <span className="text-[18px] leading-none">←</span>
              <span>All news</span>
            </Link>

            {/* ARTICLE META */}
            <div className="mt-[48px] flex items-center gap-[18px]">
              <span className="font-inter text-[10px] font-medium uppercase tracking-[0.28em] text-[#B89A67]">
                Announcement
              </span>

              <span className="font-inter text-[10px] font-medium uppercase tracking-[0.28em] text-[#7E899B]">
                July 13, 2026
              </span>
            </div>

            {/* TITLE */}
            <h1 className="mt-[28px] font-cormorant text-[46px] leading-[0.98] text-[#F2F0EA]">
  The best coffee shops in Addis
</h1>

            {/* ARTICLE CONTENT */}
            <div className="mt-[56px] max-w-[820px]">
<p className="font-inter text-[17px] leading-[1.7] text-[#C7CFD8]">                Selamta Magazine has announced Adorsi as the Best Coffee Shop
                of 2026.
                <br />
                Congratulations to the entire Adorsi team on this
                well-deserved recognition!
              </p>
            </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}