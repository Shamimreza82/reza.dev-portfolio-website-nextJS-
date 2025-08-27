"use client"

import Banner from "@/components/homePage/Banner";
import Faq from "@/components/homePage/Faq";
import Services from "@/components/homePage/Services";
import AiAssistant from "@/components/homePage/assistent/AiAssistant";



export default function Home() {


  return (
    <div className="container mx-auto">
      <Banner />
      <Services/>
      <Faq />
      <AiAssistant/>
    </div>
  );
}
