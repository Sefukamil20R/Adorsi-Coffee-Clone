import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/common/Container";
import { paymentRepository } from "@/data/payment/payment-repository";
import ChapaReturnClient from "./ChapaReturnClient";

type PageProps = {
  searchParams: Promise<{ tx_ref?: string }>;
};

export default async function ChapaReturnPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const txRef = params.tx_ref?.trim() ?? "";
  const resolved = txRef
    ? await paymentRepository.resolvePaymentForReturn(txRef)
    : { txRef: "", status: "invalid" as const };

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-[#1D2636]">
        <Container className="flex min-h-[70vh] items-center justify-center py-24 max-md:py-16">
          <ChapaReturnClient
            txRef={resolved.txRef}
            status={resolved.status}
            amount={resolved.amount}
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
