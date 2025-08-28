"use client"

import Banner from "@/components/homePage/Banner";
import Faq from "@/components/homePage/Faq";
import Services from "@/components/homePage/Services";
import AiAssistant from "@/components/homePage/assistent/AiAssistant";





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
