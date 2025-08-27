"use client";

import React from 'react'


import dynamic from "next/dynamic";

const Contact = dynamic(() => import("@/components/homePage/Contact"), {
  ssr: false, // ⬅️ disables server-side rendering
});

const ContactPage = () => {
  return (
    <div>
      <Contact />
    </div>
  )
}

export default ContactPage
