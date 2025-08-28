"use client"

import Banner from "@/components/homePage/Banner";
import Faq from "@/components/homePage/Faq";
import Services from "@/components/homePage/Services";
import AiAssistant from "@/components/homePage/assistent/AiAssistant";
import TechLoaderOverlay from "@/components/small-component/LoadingScreen";



export default function Home() {


  return (
    <div className="container mx-auto">
      <TechLoaderOverlay
        duration={2600}
        messages={[
          "Booting UI kernel",
          "Loading assets",
          "Negotiating frames",
          "Syncing state",
          "Ready to launch",
        ]}
      >
        <Banner />
        <Services />
        <Faq />
        <AiAssistant />

      </TechLoaderOverlay>

    </div>
  );
}
