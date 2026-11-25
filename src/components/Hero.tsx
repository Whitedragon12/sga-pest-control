"use client"

import { getDictionary } from "@/i18n"
import { PHONE_HREF } from "@/lib/phone"

export default function Hero({ lang }: { lang: "ru" | "ua" }) {

  const t = getDictionary(lang)

  return (

    <section
      className="relative min-h-[80vh] flex items-center text-white"
      style={{
        backgroundImage: "url('/images/hero.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >

      {/* затемнение */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative max-w-6xl mx-auto px-6">

        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          {t.hero.title}
        </h1>

        <p className="text-lg md:text-xl mb-8">
          {t.hero.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row gap-4">

          <a
            href="#contact"
            className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg font-semibold text-center"
          >
            {t.hero.order}
          </a>

          <a
            href={PHONE_HREF}
            className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition text-center"
          >
            {t.hero.call}
          </a>

        </div>

      </div>

    </section>

  )
}