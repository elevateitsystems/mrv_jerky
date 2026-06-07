import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Products } from "@/components/sections/Products";
import { StoreLocator } from "@/components/sections/StoreLocator";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <>
      <Header />
      <Toaster />
      <main className="flex-1 flex flex-col">
        <Hero />
        <Marquee />
        <Products />
        <About />
        <Gallery />
        <StoreLocator />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
