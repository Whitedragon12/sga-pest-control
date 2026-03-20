import Header from "@/components/Header"
import Footer from "@/components/Footer"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "../globals.css"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "SGA Pest Control",
  description: "Дезинсекция, дератизация и дезинфекция в Одессе",
  verification: {
    google: "MuQ4d2r4RyBZZqpz-7rXS-PGmzrz7PDOj5Wi2I1kiac"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const  lang  = "ua"

  return (
    <html lang="uk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >

        <Header lang={lang as "ru" | "ua"} />

        {children}

        <Footer lang={lang as "ru" | "ua"} />

      </body>
    </html>
  )
}