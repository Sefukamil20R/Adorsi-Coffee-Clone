import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MenuCard from "@/components/menu/MenuCard";
import Container from "@/components/common/Container";

const menuItems = [
  {
    title: "Adorsi Anaerobic",
    price: "500 ETB",
    description:
      "Single-origin Yirgacheffe from Aricha, Adorsi washing station. Anaerobic process.",
    tags: ["Signature", "Signature"],
  },
  {
    title: "Roasting Experience Room",
    price: "3000 ETB",
    description:
      "Roast your own green beans. Guided journey from green to aromatic roast.",
    tags: ["Signature", "Signature"],
  },
  {
    title: "Ube Coconut Cloud",
    price: "670 ETB",
    description:
      "Filipino purple yam blended with creamy coconut milk. Sweet notes of vanilla and caramel.",
    tags: ["Signature", "New"],
  },
  {
    title: "Adorsi Signature Latte",
    price: "550 ETB",
    description:
      "Smooth espresso layered with silky steamed milk and a subtle signature sweetness.",
    tags: ["Signature"],
  },
  {
    title: "Ethiopian Cold Brew",
    price: "480 ETB",
    description:
      "Slow-steeped Ethiopian specialty coffee with a clean body and naturally sweet finish.",
    tags: ["Signature", "Cold"],
  },
  {
    title: "Honey Cinnamon Latte",
    price: "620 ETB",
    description:
      "Espresso and steamed milk finished with Ethiopian honey and a delicate cinnamon aroma.",
    tags: ["New", "Signature"],
  },
];

export default function MenuPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#1D2636]">
        <section>
          <Container className="pb-[100px] pt-[145px] max-lg:pt-[190px] max-md:pb-[64px] max-md:pt-[190px]">
            {/* MENU INTRO */}
           <div className="mt-[35px] grid items-end gap-10 lg:grid-cols-[1fr_390px] max-md:mt-6 max-md:gap-6">
              {/* Left */}
              <div>
                <div className="flex items-center gap-[15px]">
                  <span className="h-px w-[48px] bg-[#B89A67]" />

                  <span className="font-inter text-[10px] font-medium uppercase tracking-[0.3em] text-[#B89A67]">
                    The Menu
                  </span>
                </div>

                <h1 className="mt-[35px] max-w-[470px] font-cormorant text-[60px] leading-[0.92] tracking-[-0.02em] text-[#F2F0EA] sm:text-[64px] max-md:max-w-full max-md:text-[43px] max-md:leading-[1.02]">
                  Every cup,
                  <br />
                  <span className="text-[#C7A15F]">fully explored.</span>
                </h1>
              </div>

              {/* Right */}
              <p className="w-full max-w-[390px] pb-[4px] font-inter text-[16px] leading-[1.55] text-[#C7CFD8] max-md:max-w-full max-md:text-[15px]">
                Search, filter, and sort our full catalog. All prices in
                <br className="hidden sm:block" />
                ETB add items straight to your order.
              </p>
            </div>

            {/* SEARCH + FILTERS */}
            <div className="mt-[68px] flex flex-col gap-3 xl:flex-row max-md:mt-10 max-md:gap-2">
              {/* Search */}
              <div className="flex h-[53px] min-w-0 flex-1 items-center rounded-full border border-[#435068] bg-[#283347] px-[19px] max-xl:flex-none max-md:h-[44px] max-md:px-[16px]">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-[14px] shrink-0 text-[#8995A9]"
                  aria-hidden="true"
                >
                  <circle
                    cx="11"
                    cy="11"
                    r="7"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path
                    d="M16.5 16.5L21 21"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>

                <span className="truncate font-inter text-[15px] text-[#8995A9]">
                  Search drinks, food, categories...
                </span>
              </div>

              {/* Category */}
              <button
                type="button"
                className="flex h-[53px] min-w-[195px] items-center justify-between rounded-full border border-[#435068] bg-[#283347] px-[22px] font-inter text-[15px] text-[#F2F0EA] max-md:h-[44px] max-md:w-full max-md:min-w-0 max-md:px-[18px]"
              >
                <span>All categories</span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#8995A9]"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Tags */}
              <button
                type="button"
                className="flex h-[53px] min-w-[160px] items-center justify-between rounded-full border border-[#435068] bg-[#283347] px-[22px] font-inter text-[15px] text-[#F2F0EA] max-md:h-[44px] max-md:w-full max-md:min-w-0 max-md:px-[18px]"
              >
                <span>All tags</span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#8995A9]"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Price */}
              <button
                type="button"
                className="flex h-[53px] min-w-[170px] items-center justify-between rounded-full border border-[#435068] bg-[#283347] px-[22px] font-inter text-[15px] text-[#F2F0EA] max-md:h-[44px] max-md:w-full max-md:min-w-0 max-md:px-[18px]"
              >
                <span>All prices</span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#8995A9]"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {/* Sort */}
              <button
                type="button"
                className="flex h-[53px] min-w-[195px] items-center justify-between rounded-full border border-[#435068] bg-[#283347] px-[20px] font-inter text-[15px] text-[#F2F0EA] max-md:h-[44px] max-md:w-full max-md:min-w-0 max-md:px-[18px]"
              >
                <span className="flex items-center gap-[12px] max-md:gap-[10px]">
                  <span className="text-[19px] text-[#8995A9] max-md:text-[17px]">↕</span>
                  <span>Sort: Category</span>
                </span>

                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-[#8995A9]"
                  aria-hidden="true"
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="1.7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* ITEM COUNT */}
            <p className="mt-[45px] font-inter text-[15px] text-[#8995A9] max-md:mt-8">
              126 items
            </p>

           {/* MENU GRID */}
<div
  className="
    mt-[36px]
    grid
    grid-cols-1
    gap-px
    overflow-hidden
    bg-[rgba(184,154,103,0.20)]
    md:grid-cols-2
    lg:grid-cols-3

    [&>div]:!border-r-0
    max-md:mt-7
  "
>
  {menuItems.map((item, index) => (
    <MenuCard
      key={`${item.title}-${index}`}
      title={item.title}
      price={item.price}
      description={item.description}
      tags={item.tags}
    />
  ))}
</div>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}