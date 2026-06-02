import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Products } from "@/components/sections/Products";
import { StoreLocator } from "@/components/sections/StoreLocator";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Marquee />
        <Products />
        <About />
        <StoreLocator />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
