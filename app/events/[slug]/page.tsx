import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/common/Container";
import { EVENTS_BY_SLUG, getEventBySlug } from "@/domain/events/events-data";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(EVENTS_BY_SLUG).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) return { title: "Event · Adorsi" };
  return {
    title: `${event.title} · Adorsi`,
  };
}

function CalendarIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      className="mt-0.5 shrink-0 text-[#B89A67]"
      aria-hidden
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
  );
}

function PinIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      className="mt-0.5 shrink-0 text-[#B89A67]"
      aria-hidden
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
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M14 5H19V10M19 5L10 14M19 14V19H5V5H10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InfoCard({
  icon,
  label,
  value,
  className = "",
}: {
  icon: ReactNode;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`flex min-w-0 items-start gap-3 rounded-[14px] border border-[#344056] bg-[#283347] px-5 py-[18px] ${className}`}
    >
      {icon}
      <div className="min-w-0">
        <p className="font-inter text-[9px] font-medium uppercase tracking-[0.28em] text-[#B89A67]">
          {label}
        </p>
        <p className="mt-2 font-inter text-[14px] leading-[1.45] text-[#E8ECF1]">
          {value}
        </p>
      </div>
    </div>
  );
}

export default async function EventDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <>
      <Navbar />

      <main className="bg-[#1D2636]">
        <section>
          <Container className="pb-[120px] pt-[145px] max-lg:pt-[190px] max-md:pb-[80px] max-md:pt-[190px]">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 font-inter text-[14px] text-[#8F9BAD] transition hover:text-[#C7CFD8]"
            >
              <span aria-hidden className="text-[15px] leading-none">
                ←
              </span>
              All events
            </Link>

            <div className="mt-[42px] lg:mt-[48px] lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,400px)] lg:items-start lg:gap-x-14 xl:gap-x-20">
              <div className="min-w-0 lg:col-start-1">
                <p className="font-inter text-[10px] font-medium uppercase tracking-[0.3em] text-[#B89A67]">
                  Free event
                </p>

                <h1 className="mt-[16px] font-cormorant text-[52px] leading-[0.98] text-[#F2F0EA] max-md:text-[40px] max-md:leading-[1.02]">
                  {event.title}
                </h1>

                <div className="mt-[32px] flex flex-col gap-3 sm:flex-row sm:gap-3 max-md:mt-7">
                  <InfoCard
                    icon={<CalendarIcon />}
                    label="When"
                    value={event.when}
                    className="sm:min-w-0 sm:flex-1"
                  />
                  <InfoCard
                    icon={<PinIcon />}
                    label="Where"
                    value={event.where}
                    className="sm:w-full sm:max-w-[260px] sm:flex-none"
                  />
                </div>

                <div className="mt-[48px] max-md:mt-10">
                  <p className="font-inter text-[10px] font-medium uppercase tracking-[0.3em] text-[#B89A67]">
                    About
                  </p>
                  <p className="mt-[18px] max-w-[640px] font-inter text-[16px] leading-[1.7] text-[#C7CFD8] max-md:text-[15px] max-md:leading-[1.65]">
                    {event.about}
                  </p>
                </div>
              </div>

              <aside className="mt-10 lg:col-start-2 lg:row-start-1 lg:mt-[72px] lg:self-start max-md:mt-9">
                <div className="rounded-[16px] border border-[#344056] bg-[#283347] px-8 py-8 max-md:px-6 max-md:py-7">
                  <p className="font-inter text-[10px] font-medium uppercase tracking-[0.3em] text-[#B89A67]">
                    Registration
                  </p>

                  <h2 className="mt-[14px] font-cormorant text-[26px] leading-[1.15] text-[#F2F0EA] max-md:text-[24px]">
                    Register for this event
                  </h2>

                  <p className="mt-3 font-inter text-[14px] leading-[1.55] text-[#8F9BAD]">
                    Complete your registration on luma.com.
                  </p>

                  <a
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--gold)] px-6 py-3.5 font-inter text-[14px] font-medium text-[var(--blue-black)] transition hover:opacity-90"
                  >
                    Register now
                    <ExternalLinkIcon />
                  </a>

                  <p className="mt-5 break-all font-inter text-[12px] leading-relaxed text-[#6B778A]">
                    {event.registrationUrl}
                  </p>
                </div>
              </aside>
            </div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
