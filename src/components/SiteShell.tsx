"use client"

import type { ReactNode } from "react"
import { useSelectedLayoutSegment } from "next/navigation"
import Header from "@/components/Header"

// The root layout is shared by "/" and "/ru", so the language comes from the active route.
// Both footers are rendered on the server and passed in; only the matching one is shown.
export default function SiteShell({
  className,
  footer,
  children,
}: {
  className: string
  footer: { ua: ReactNode; ru: ReactNode }
  children: ReactNode
}) {

  const lang = useSelectedLayoutSegment() === "ru" ? "ru" : "ua"

  return (
    <html lang={lang === "ua" ? "uk" : "ru"}>
      <body className={`${className} pl-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pb-[calc(3.5rem+env(safe-area-inset-bottom))] lg:pb-0`}>

        <Header lang={lang} />

        {children}

        {footer[lang]}

      </body>
    </html>
  )
}
