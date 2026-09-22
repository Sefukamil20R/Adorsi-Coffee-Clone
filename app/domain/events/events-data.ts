export type EventDetail = {
  slug: string;
  title: string;
  listDateLine: string;
  when: string;
  where: string;
  about: string;
  registrationUrl: string;
  listTags: string[];
};

export const COFFEE_ATELIER_SLUG = "the-coffee-atelier";

export const EVENTS_BY_SLUG: Record<string, EventDetail> = {
  [COFFEE_ATELIER_SLUG]: {
    slug: COFFEE_ATELIER_SLUG,
    title: "The Coffee Atelier",
    listTags: ["Free", "External Registration"],
    listDateLine: "Thu, Jul 16 • 6:00 PM",
    when: "Thursday, July 16, 2026 · 6:00 PM – 9:00 AM",
    where: "Adorsi Coffee",
    about:
      "Join us for an intimate evening where coffee becomes composition. Coffee moves beyond the cup through thoughtfully curated compositions, each thoughtfully paired to elevate every sip and reveal a different expression of specialty coffee. Accompanied by soulful jazz, live craftsmanship, and meaningful conversation, the evening is designed to be shared, discovered, and remembered.",
    registrationUrl: "https://luma.com/fxtdfsrw",
  },
};

export function getEventBySlug(slug: string): EventDetail | undefined {
  return EVENTS_BY_SLUG[slug];
}
