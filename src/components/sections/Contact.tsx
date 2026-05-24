"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-primary/20 bg-[linear-gradient(180deg,#09070c,#141018)] py-20 text-white md:py-28"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-14">
          <p className="mb-3 font-heading text-sm font-bold uppercase tracking-[0.28em] text-primary">
            Contact
          </p>
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-zinc-300 text-lg max-w-2xl mx-auto">
            Questions, wholesale orders, and custom batch requests all start
            here.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative min-h-[360px] overflow-hidden rounded-lg border border-white/10 bg-zinc-950 shadow-2xl lg:min-h-full">
            <Image
              src="/images/contactus.png"
              alt="MRV beef jerky contact"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          </div>

          <div>
            <Card className="rounded-lg border-white/10 bg-black/55 text-white shadow-[0_18px_45px_rgba(0,0,0,0.32)]">
              <CardHeader>
                <CardTitle className="font-heading text-2xl font-bold uppercase">
                  Send us a message
                </CardTitle>
                <CardDescription className="text-zinc-400">
                  Fill out the form below and we&apos;ll get back to you.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input className="border-white/15 bg-white/8 text-white placeholder:text-zinc-500" placeholder="Your name" />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input className="border-white/15 bg-white/8 text-white placeholder:text-zinc-500" type="email" placeholder="you@example.com" />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input className="border-white/15 bg-white/8 text-white placeholder:text-zinc-500" placeholder="01XXXXXXXXX" />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea className="border-white/15 bg-white/8 text-white placeholder:text-zinc-500" placeholder="Write your message..." rows={5} />
                  </div>

                  {/* Button */}
                  <Button className="h-12 w-full rounded-[4px] font-heading font-bold uppercase tracking-wider">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
