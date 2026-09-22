export type ShopProduct = {
  id: string;
  name: string;
  priceValue: number;
  priceLabel: string;
  description: string;
  image: string;
};

export const SHOP_PRODUCTS: ShopProduct[] = [
  {
    id: "shop-adorsi-coffee-1kg",
    name: "Adorsi Coffee",
    priceValue: 46000,
    priceLabel: "46000 ETB",
    description: "Premium Ethiopian Coffee : 1kg",
    image: "/shop/adorsiblue.png",
  },
  {
    id: "shop-adorsi-coffee-500g",
    name: "Adorsi coffee",
    priceValue: 23000,
    priceLabel: "23000 ETB",
    description: "Premium Ethiopian Coffee : 500g",
    image: "/shop/adorsiwhite.png",
  },
];

const priceById = new Map(SHOP_PRODUCTS.map((p) => [p.id, p.priceValue]));

export function getShopProductPrice(id: string): number | undefined {
  return priceById.get(id);
}

export function mergeShopPricesIntoMap(
  ids: string[],
  target: Map<string, number>,
): void {
  for (const id of ids) {
    const price = getShopProductPrice(id);
    if (price !== undefined) {
      target.set(id, price);
    }
  }
}
