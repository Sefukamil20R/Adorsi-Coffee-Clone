import ProductCard from "@/components/shop/ProductCard";
import Container from "../common/Container";

export default function ShopProducts() {
  return (
    <section className="bg-[#1D2636]">
      <Container className="pb-[96px] pt-[108px]">
        <div className="text-center">
          <div className="flex items-center justify-center gap-[13px]">
            <span className="h-px w-[38px] bg-[#8E7652]" />

            <span className="font-inter text-[10px] font-medium uppercase tracking-[0.3em] text-[#B89A67]">
              Retail &amp; Merch
            </span>

            <span className="h-px w-[38px] bg-[#8E7652]" />
          </div>

          <h1 className="mt-[22px] font-cormorant text-[58px] leading-[0.92] text-[#F2F0EA] sm:text-[64px]">
            Shop The Adorsi Products
          </h1>

          <p className="mx-auto mt-[24px] max-w-[690px] font-inter text-[18px] leading-[1.55] text-[#C3CAD4]">
            Take the Adorsi experience home. Premium roasted beans, brewing
            <br className="hidden sm:block" />
            equipment, and exclusive merchandise.
          </p>
        </div>

        {/* Products */}
        <div className="mt-[70px] grid w-full max-w-[820px] gap-[42px] md:grid-cols-2">
          <ProductCard
            image="/shop/adorsiblue.png"
            name="Adorsi Coffee"
            price="46000 ETB"
            description="Premium Ethiopian Coffee : 1kg"
          />

          <ProductCard
            image="/shop/adorsiwhite.png"
            name="Adorsi coffee"
            price="23000 ETB"
            description="Premium Ethiopian Coffee : 500g"
          />
        </div>
      </Container>
    </section>
  );
}