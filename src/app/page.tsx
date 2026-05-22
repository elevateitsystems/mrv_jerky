import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Products } from "@/components/sections/Products";
import { About } from "@/components/sections/About";
import { Newsletter } from "@/components/sections/Newsletter";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Marquee />
        <Products />
        <About />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
