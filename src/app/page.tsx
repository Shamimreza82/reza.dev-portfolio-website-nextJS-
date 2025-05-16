"use client"

import Banner from "@/components/homePage/Banner";
import About from "./about/page";



export default function Home() {


  return (
    <div className="container mx-auto">
      <Banner />
      <About/>
    </div>
  );
}
