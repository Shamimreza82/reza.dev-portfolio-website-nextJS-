"use client"
import "./globals.css";
import Navber from "@/components/Navber";
import { SessionProvider } from "next-auth/react";



// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased bg-slate-900 text-white font-Roboto `}
      >

        {/* <Cursor></Cursor> */}
        <Navber></Navber>
      <SessionProvider>  {children}</SessionProvider>
    
      </body>
    </html>
  );
}
