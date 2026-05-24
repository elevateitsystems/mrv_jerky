"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Our Story", href: "#about" },
  { name: "Shop", href: "#products" },
  { name: "Wholesale", href: "#contact" },
  { name: "Contact", href: "#contact" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        isScrolled
          ? "border-b border-primary/20 bg-black/90 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-md"
          : "bg-black/85 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" />
            }
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] border-primary/20 bg-zinc-950 text-white sm:w-[400px]">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="flex flex-col gap-6 mt-10">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-2xl font-heading hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="MRV Jerky Logo"
            width={72}
            height={72}
            className="h-16 w-16 object-contain md:h-[4.5rem] md:w-[4.5rem]"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="border-b-2 border-transparent pb-1 font-heading text-sm font-bold uppercase tracking-wider text-white/90 hover:border-primary hover:text-primary"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Cart/CTA */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="hidden text-white hover:bg-white/10 hover:text-primary md:inline-flex"
          >
            <UserRound className="h-6 w-6" />
            <span className="sr-only">Account</span>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-white hover:bg-white/10 hover:text-primary"
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
              0
            </span>
            <span className="sr-only">Cart</span>
          </Button>
          <Button className="hidden h-12 rounded-[4px] px-7 font-heading text-base font-bold uppercase tracking-wider shadow-[0_0_24px_rgba(110,75,174,0.42)] md:flex">
            Shop Now
          </Button>
        </div>
      </div>
    </header>
  );
}
