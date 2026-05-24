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
      className="py-20 md:py-32 bg-white dark:bg-zinc-900 border-t border-border"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-4">
            Get in <span className="text-primary">Touch</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions about our jerky or want to collaborate? Send us a
            message and we'll reply soon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 ">
          {/* Image Side */}
          <div className="lg:relative h-auto rounded-xl">
            <Image
              src="/images/contactus.png"
              alt="Contact"
              fill
              className="object-cover !h-[471px]"
            />
          </div>

          {/* Form Side */}
          <div>
            <Card className="rounded-xl border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  Send us a message
                </CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form className="space-y-5">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="Your name" />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="you@example.com" />
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input placeholder="01XXXXXXXXX" />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label>Message</Label>
                    <Textarea placeholder="Write your message..." rows={5} />
                  </div>

                  {/* Button */}
                  <Button className="w-full font-bold uppercase tracking-wider">
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
