"use client"

import { getDictionary } from "@/i18n"

export default function Process({ lang }: { lang: "ru" | "ua" }) {

  const t = getDictionary(lang)

  return (

    <section id="process" className="py-24 bg-[var(--section)]">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          {t.process.title}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">

          {t.process.steps.map((step, i) => (

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

              <div className="text-3xl font-bold text-[var(--accent)] mb-4">
                {i + 1}
              </div>

              <h3 className="font-semibold mb-3 text-lg">
                {step.title}
              </h3>

              <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                {step.text}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>

  )

}