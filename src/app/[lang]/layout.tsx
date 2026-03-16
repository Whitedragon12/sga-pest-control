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
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: "ru" | "ua" }>
}) {

  const { lang } = await params

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >

        <Header lang={lang} />

        {children}

        <Footer lang={lang} />

      </body>
    </html>
  )
}