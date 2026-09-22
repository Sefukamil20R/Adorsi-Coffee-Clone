import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import MenuPreview from "@/components/home/MenuPreview";
import Signature from "@/components/home/Signature";
import Space from "@/components/home/Space";
import Source from "@/components/home/Source";
import Community from "@/components/home/Community";
import Visit from "@/components/home/Visit";
import AskBaristaAI from "@/components/common/AskBaristaAI";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <About />
        <MenuPreview />
        <Signature />
        <Space />
        <Source />
        <Community />
        <Visit />
      </main>

      <Footer />

      <AskBaristaAI />
    </>
  );
}