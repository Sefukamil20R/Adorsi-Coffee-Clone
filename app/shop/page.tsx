import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import ShopProducts from "@/components/shop/ShopProducts";
import Roaster from "@/components/shop/Roaster";

export default function ShopPage() {
  return (
    <>
      <Navbar />

      <main>
        <ShopProducts />
        <Roaster />
      </main>

      <Footer />
    </>
  );
}