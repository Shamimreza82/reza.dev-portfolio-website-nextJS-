import { NextResponse } from "next/server";
import sharp from "sharp";
import path from "path";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const { icon, text, color, font } = body;

  const iconPath = path.join(process.cwd(), "public/icons", icon);
  const fontPath = path.join(process.cwd(), "public/fonts", font);

  

  const svgText = `
    <svg width="500" height="150">
      <style>
        @font-face {
          font-family: CustomFont;
          src: url("file://${fontPath}");
        }
        text {
          font-family: CustomFont;
          font-size: 48px;
          fill: ${color};
        }
      </style>
      <text x="250" y="80" text-anchor="middle">${text}</text>
    </svg>
  `;

  const buffer = await sharp(iconPath)
    .resize(300, 300)
    .extend({
      top: 0,
      bottom: 150,
      left: 0,
      right: 0,
      background: "#ffffff",
    })
    .composite([{ input: Buffer.from(svgText), top: 300 }])
    .png()
    .toBuffer();

  return new NextResponse(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": "attachment; filename=logo.png",
    },
  });
}
