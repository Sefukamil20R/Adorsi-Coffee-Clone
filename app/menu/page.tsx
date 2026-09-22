import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MenuBrowser from "@/components/menu/MenuBrowser";
import Container from "@/components/common/Container";
import { Suspense } from "react";

export default function MenuPage() {
  return (
    <>
      <Navbar />

      <main className="bg-[#1D2636]">
        <section>
          <Container className="pb-[100px] pt-[145px] max-lg:pt-[190px] max-md:pb-[64px] max-md:pt-[190px]">
            <div className="mt-[35px] grid items-end gap-10 lg:grid-cols-[1fr_390px] max-md:mt-6 max-md:gap-6">
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

              <p className="w-full max-w-[390px] pb-[4px] font-inter text-[16px] leading-[1.55] text-[#C7CFD8] max-md:max-w-full max-md:text-[15px]">
                Search, filter, and sort our full catalog. All prices in
                <br className="hidden sm:block" />
                ETB add items straight to your order.
              </p>
            </div>

            <Suspense fallback={null}>
              <MenuBrowser />
            </Suspense>
          </Container>
        </section>
      </main>

      <Footer />
    </>
  );
}
