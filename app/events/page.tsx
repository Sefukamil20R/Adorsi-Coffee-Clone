import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";

export default function EventsPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#1D2636]">
        <section>
          <Container className="pb-[190px] pt-[190px]">
            {/* HEADER */}
            <div>
              <div className="flex items-center gap-[13px]">
                <span className="h-px w-[43px] bg-[#B89A67]" />

                <span className="font-inter text-[9px] font-medium uppercase tracking-[0.3em] text-[#B89A67]">
                  Community
                </span>
              </div>

              <h1 className="mt-[34px] font-cormorant text-[46px] leading-[0.95] text-[#F2F0EA]">
                Upcoming Events
              </h1>

              <p className="mt-[28px] max-w-[700px] font-inter text-[16px] leading-[1.55] text-[#C7CFD8]">
                Adorsi-hosted tastings, workshops, and gatherings. Pay online
                with Chapa —
                <br className="hidden sm:block" />
                Adorsi collects payment even for partner events.
              </p>
            </div>

            {/* UPCOMING EVENTS */}
            <div className="mt-[60px] flex h-[168px] items-center justify-center rounded-[17px] border border-[#344056]">
              <p className="font-inter text-[15px] text-[#8F9BAD]">
                No upcoming events right now. Follow our news page for
                announcements.
              </p>
            </div>

            {/* PAST EVENTS */}
            <div className="mt-[88px]">
              <h2 className="font-cormorant text-[25px] leading-none text-[#F2F0EA]">
                Past events
              </h2>

              <div className="mt-[38px] w-full max-w-[444px] rounded-[17px] border border-[#344056] px-[38px] py-[37px]">
                <div className="flex items-center gap-[13px]">
                  <span className="font-inter text-[10px] font-medium uppercase tracking-[0.25em] text-[#B89A67]">
                    Free
                  </span>

                  <span className="font-inter text-[10px] font-medium uppercase tracking-[0.25em] text-[#7E899B]">
                    External Registration
                  </span>
                </div>

                <h3 className="mt-[20px] font-cormorant text-[25px] leading-none text-[#F2F0EA]">
                  The Coffee Atelier
                </h3>

                <div className="mt-[23px] flex items-center gap-[10px]">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#B89A67]"
                  >
                    <rect
                      x="3"
                      y="5"
                      width="18"
                      height="16"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M7 3V7M17 3V7M3 10H21"
                      stroke="currentColor"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>

                  <span className="font-inter text-[14px] text-[#AAB3C1]">
                    Thu, Jul 16 • 6:00 PM
                  </span>
                </div>

                <div className="mt-[11px] flex items-center gap-[10px]">
                  <svg
                    width="17"
                    height="17"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#B89A67]"
                  >
                    <path
                      d="M20 10C20 15 12 21 12 21C12 21 4 15 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10Z"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                    <circle
                      cx="12"
                      cy="10"
                      r="2.5"
                      stroke="currentColor"
                      strokeWidth="1.7"
                    />
                  </svg>

                  <span className="font-inter text-[14px] text-[#AAB3C1]">
                    Adorsi Coffee
                  </span>
                </div>

                <button
                  type="button"
                  className="mt-[23px] rounded-full border border-[#806D4F] bg-[#3A3E45] px-[18px] py-[9px] font-inter text-[14px] text-[#B89A67] transition-colors hover:bg-[#454A52]"
                >
                  Register →
                </button>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}