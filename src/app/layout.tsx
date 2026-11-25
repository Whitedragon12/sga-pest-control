import SiteShell from "@/components/SiteShell"
import Footer from "@/components/Footer"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { getDictionary } from "@/i18n"
import "./globals.css"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

// lets env(safe-area-inset-bottom) work on iPhones, for the bottom bar
export const viewport: Viewport = {
  viewportFit: "cover",
}

export const metadata: Metadata = {
  ...getDictionary("ua").meta,
  verification: {
    google: "MuQ4d2r4RyBZZqpz-7rXS-PGmzrz7PDOj5Wi2I1kiac"
  },
  alternates: {
    languages: {
      "uk-UA": "https://sgapest.com.ua",
      "ru-UA": "https://sgapest.com.ua/ru",
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <SiteShell
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      footer={{
        ua: <Footer lang="ua" />,
        ru: <Footer lang="ru" />,
      }}
    >
      {children}
    </SiteShell>
  )
}