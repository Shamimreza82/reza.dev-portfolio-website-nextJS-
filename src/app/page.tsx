import Banner from "@/components/homePage/Banner";
import About from "@/components/homePage/About";
import Faq from "@/components/homePage/Faq";
import Services from "@/components/homePage/Services";
import AiAssistant from "@/components/homePage/assistent/AiAssistant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Reza - Full-Stack Web Developer",
  description: "Welcome to my portfolio. I'm a full-stack web developer specializing in Next.js, React, and Node.js. Let's build something amazing together.",
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <Banner />
      <About />
      <Services />
      <Faq />
      <AiAssistant />
    </div>
  );
}
