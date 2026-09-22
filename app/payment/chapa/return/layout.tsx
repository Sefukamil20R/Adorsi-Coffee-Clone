export default function ChapaReturnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-col bg-[#1D2636]">{children}</div>
  );
}
