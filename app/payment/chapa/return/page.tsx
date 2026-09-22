import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/common/Container";
import ChapaReturnClient from "./ChapaReturnClient";

type PageProps = {
  searchParams: Promise<{ tx_ref?: string }>;
};

export default async function ChapaReturnPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const txRef = params.tx_ref?.trim() ?? "";

  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col bg-[#1D2636]">
        <Container className="flex flex-1 items-center justify-center pb-24 pt-[168px] max-md:pb-16 max-md:pt-[190px] max-lg:pt-[200px]">
          <ChapaReturnClient txRef={txRef} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
