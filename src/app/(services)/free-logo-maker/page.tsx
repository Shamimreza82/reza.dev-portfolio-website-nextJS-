/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

// export const metadata = {
//   title: "Free Logo Maker Online | Rezahub",
//   description: "Create a professional logo for free using Rezahub's logo maker tool.",
// };


export default function LogoMaker() {
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  async function generateLogo(e: any) {
    e.preventDefault();

    const form = e.target;

    const res = await fetch("/api/logo", {
      method: "POST",
      body: JSON.stringify({
        icon: form.icon.value,
        text: form.text.value,
        color: form.color.value,
        font: form.font.value,
      }),
    });

    const blob = await res.blob();
    setLogoUrl(URL.createObjectURL(blob));
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Free Logo Maker</h1>

      <form onSubmit={generateLogo}>
        <select name="icon">
          <option value="star.png">Star</option>
          <option value="rocket.png">Rocket</option>
        </select>

        <input name="text" placeholder="Your brand" required />

        <select name="font">
          <option value="Poppins-Bold.ttf">Poppins</option>
          <option value="Roboto-Bold.ttf">Roboto</option>
        </select>

        <input type="color" name="color" defaultValue="#000000" />

        <button type="submit">Generate</button>
      </form>

      {logoUrl && (
        <>
          <h2>Your Logo</h2>
          <img src={logoUrl} width={300} />
          <br />
          <a href={logoUrl} download="logo.png">Download Logo</a>
        </>
      )}
    </div>
  );
}
