"use client";
import React from "react";

export const metadata = {
  title: "Contact | reza.dev",
  description: "Get in touch with the team at reza.dev",
};

import { useForm } from "react-hook-form";

import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// -------- app/contact/page.tsx --------
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
type ContactForm = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ContactForm>();

  const onSubmit = async (data: ContactForm) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Network response was not ok");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto min-h-screen  flex items-center justify-center ">
      <Card className="w-full p-6 shadow-lg">
        <CardHeader>
            <div className="flex justify-center">
            <CardTitle>Contact</CardTitle>
            </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name")} />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
              {errors.email && (<p className="text-red-500 text-sm mt-1">{errors.email.message}</p>)}
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" rows={5} {...register("message")} />
              {errors.message && (<p className="text-red-500 text-sm mt-1">{errors.message.message}</p>)}
            </div>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>

            {isSubmitSuccessful && (<p className="text-green-500">Your message has been sent!</p>)}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// -------- app/api/contact/route.ts --------
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();
  console.log("New contact message for reza.dev:", { name, email, message });
  return NextResponse.json({ status: "success" }, { status: 200 });
}
