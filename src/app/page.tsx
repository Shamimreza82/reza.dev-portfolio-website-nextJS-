import Banner from "@/components/homePage/Banner";
import AiAssistant from "@/components/homePage/assistent/AiAssistant";
import ScrollProgress from "@/components/small-component/ScrollProgress";
import ProjectsSection from "@/components/homePage/ProjectsSection";
import JourneySection from "@/components/homePage/JourneySection";
import GitHubStatus from "@/components/homePage/GitHubStatus";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Reza - Full-Stack Web Developer",
  description: "Welcome to my portfolio. I'm a full-stack web developer specializing in Next.js, React, and Node.js. Let's build something amazing together.",
};

export default function Home() {
  return (
    <div className="flex flex-col">
      <ScrollProgress />
      <Banner />
      <ProjectsSection />
      <JourneySection />
      <GitHubStatus />
      <AiAssistant />
    </div>
  );
}
