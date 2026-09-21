import Container from "../common/Container";
import MenuCard from "../menu/MenuCard";

const categories = [
  "Signature",
  "Filter Coffee",
  "Black Coffee",
  "Milk Coffee",
  "Non-Coffee",
  "Cold & Shakes",
  "Fasting",
  "Tea & Refreshments",
  "Breakfast",
  "Snacks",
  "Salads",
  "Pastry",
  "Juice",
  "Extras",
];

export default function MenuPreview() {
  return (
    <section className="bg-[var(--blue-black)] py-24">
      <Container>
        {/* Top */}
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-[var(--gold)]" />
              <p className="text-[11px] uppercase tracking-[0.35em] text-[var(--gold)]">
                The Menu
              </p>
            </div>

<h2 className="font-heading text-[52px] leading-[1.12] text-white">              Built for ritual.
              <br />
              <span className="text-[var(--gold)]">
                Ordered with ease.
              </span>
            </h2>
          </div>

          <div className="flex items-center justify-end">
            <p className="max-w-[360px] text-[15px] leading-7 text-[#C7CFD8]">
              Tap to add. Review your selections in the cart and place your order
              we&apos;ll have it ready when you arrive.{" "}
              <span className="text-[var(--gold)]">
                Browse the full menu →
              </span>
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-12 flex flex-wrap gap-4 border-b border-white/10 pb-8">
          {categories.map((item, index) => (
            <button
              key={item}
              className={`rounded-full px-5 py-3 text-[15px] transition ${
                index === 0
                  ? "bg-[var(--gold)] text-[var(--blue-black)]"
                  : "text-white/65 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="mt-12 grid lg:grid-cols-3">
          <MenuCard
            title="Adorsi Anaerobic"
            price="500 ETB"
            tags={["SIGNATURE", "SIGNATURE"]}
            description="Single-origin Yirgacheffe from Aricha. Adorsi washing station. Anaerobic process."
          />

          <MenuCard
            title="Roasting Experience Room"
            price="3000 ETB"
            tags={["SIGNATURE", "SIGNATURE"]}
            description="Roast your own green beans. Guided journey from green to aromatic roast."
          />

          <MenuCard
            title="Ube Coconut Cloud"
            price="670 ETB"
            tags={["SIGNATURE", "NEW"]}
            description="Filipino purple yam blended with creamy coconut milk. Sweet notes of vanilla and caramel."
          />
        </div>
      </Container>
    </section>
  );
}