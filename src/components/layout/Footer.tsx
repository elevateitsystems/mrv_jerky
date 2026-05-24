import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-black text-zinc-400 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand & Mission */}
          <div className="md:col-span-2">
            <Link href="/" className="mb-4 inline-flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="MRV Jerky Logo"
                width={72}
                height={72}
                className="h-16 w-16 object-contain"
              />
              <span className="font-heading text-2xl font-bold tracking-tighter text-white uppercase">
                MRV <span className="text-primary">Beef Jerky</span>
              </span>
            </Link>
            <p className="mb-6 max-w-sm">
              Real ingredients, bold flavor, and premium beef jerky crafted
              with valley pride.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-primary text-sm font-bold uppercase tracking-wider">
                Instagram
              </Link>
              <Link href="#" className="hover:text-primary text-sm font-bold uppercase tracking-wider">
                Facebook
              </Link>
              <Link href="#" className="hover:text-primary text-sm font-bold uppercase tracking-wider">
                Twitter
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-white text-lg font-bold mb-4 uppercase">Shop</h3>
            <ul className="flex flex-col gap-2">
              <li>
                 <Link href="#products" className="hover:text-primary">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Variety Packs
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Subscribe & Save
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-heading text-white text-lg font-bold mb-4 uppercase">Support</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <Link href="#contact" className="hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-sm">
          <p>&copy; {new Date().getFullYear()} MRVJerky. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span>Built for the Bold</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
