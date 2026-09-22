"use client";

import Image from "next/image";
import { useCart } from "@/components/cart/CartContext";

type ProductCardProps = {
  cartId: string;
  image: string;
  name: string;
  price: string;
  priceValue: number;
  description: string;
};

function CartIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 8.5H18L17.2 20H6.8L6 8.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M9 8.5V6.5C9 4.84 10.34 3.5 12 3.5C13.66 3.5 15 4.84 15 6.5V8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function ProductCard({
  cartId,
  image,
  name,
  price,
  priceValue,
  description,
}: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: cartId,
      title: name,
      price,
      priceValue,
    });
  };

  return (
    <article className="w-full overflow-hidden rounded-[16px] border border-[#34445D] bg-[#28354A]">
      {/* Product image */}
      <div className="relative h-[440px] w-full overflow-hidden bg-[#071C3C] max-md:h-auto max-md:aspect-[4/3]">
        <Image
          src={image}
          alt={name}
          fill
          priority
          className="object-cover max-md:object-contain"
          sizes="(max-width: 768px) 100vw, 430px"
        />

        {/* Add to cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="absolute bottom-[20px] right-[22px] flex h-[50px] items-center gap-[9px] rounded-full bg-[#C7A15F] px-[22px] font-inter text-[15px] font-medium text-[#1D2636] transition-opacity hover:opacity-90"
        >
          <CartIcon />
          <span>Add to Cart</span>
        </button>
      </div>

      {/* Product information */}
      <div className="px-[30px] pb-[35px] pt-[27px] max-md:px-5 max-md:pb-7 max-md:pt-6">
        <div className="flex items-baseline justify-between gap-4 max-md:items-start">
          <h3 className="font-cormorant text-[27px] leading-none text-[#F2F0EA] max-md:text-[24px]">
            {name}
          </h3>

          <span className="shrink-0 font-cormorant text-[20px] leading-none text-[#C7A15F] max-md:text-[18px]">
            {price}
          </span>
        </div>

        <p className="mt-[20px] font-inter text-[14px] leading-[1.4] text-[#B7C0CE]">
          {description}
        </p>
      </div>
    </article>
  );
}
