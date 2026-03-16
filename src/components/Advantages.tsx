"use client"

import { getDictionary } from "@/i18n"

export default function Advantages({ lang }: { lang: "ru" | "ua" }) {

  const t = getDictionary(lang)

  return (

    <section id="advantages" className="py-24 bg-[var(--section)]">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          {t.advantages.title}
        </h2>


        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {t.advantages.items.map((item, i) => (

            <div
              key={i}
              className="
              bg-[var(--card)]
              p-7
              rounded-2xl
              border
              border-[var(--border)]
              hover:border-[var(--accent)]
              hover:-translate-y-1
              transition-all
              duration-300
              "
            >

              <h3 className="font-semibold mb-3 text-lg">
                {item.title}
              </h3>

              <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                {item.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  )

}