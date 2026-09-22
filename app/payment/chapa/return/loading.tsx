import Container from "@/components/common/Container";

export default function ChapaReturnLoading() {
  return (
    <main className="flex flex-1 flex-col bg-[#1D2636]">
        <Container className="flex flex-1 items-center justify-center pb-24 pt-[168px] max-md:pb-16 max-md:pt-[190px] max-lg:pt-[200px]">
          <p className="font-inter text-[14px] text-[#8995A9]">
            Confirming your payment…
          </p>
        </Container>
    </main>
  );
}
