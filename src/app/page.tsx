import Banner from "@/components/homePage/Banner";
import Faq from "@/components/homePage/Faq";
import Services from "@/components/homePage/Services";
import AiAssistant from "@/components/homePage/assistent/AiAssistant";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Reza - Full-Stack Web Developer",
  description: "Welcome to my portfolio. I'm a full-stack web developer specializing in Next.js, React, and Node.js. Let's build something amazing together.",
};

export default function Home() {

  // const { isPlaying, toggleMusic } = useMusic()

  // console.log(isPlaying)

  // useEffect(() => {
  //   if (isPlaying) {
  //     toggleMusic()
  //   }
  // }, [])


  return (
    <div className="container mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Reza",
            "url": "https://www.reza.dev",
            "sameAs": [
              "https://www.linkedin.com/in/reza-c/",
              "https://github.com/reza-c/",
            ],
            "jobTitle": "Full-Stack Web Developer",
            "worksFor": {
              "@type": "Organization",
              "name": "Reza.dev",
            },
          }),
        }}
      />
      {/* <TechLoaderOverlay
        duration={2600}
        messages={[
          "Booting UI kernel",
          "Loading assets",
          "Negotiating frames",
          "Syncing state",
          "Ready to launch",
        ]}
      >

      </TechLoaderOverlay> */}
        <Banner />
        <Services />
        <Faq />
        <AiAssistant />
    </div>
  );
}
