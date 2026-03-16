"use client"

import { useState } from "react"
import { getDictionary } from "@/i18n"

export default function FAQ({ lang }: { lang: "ru" | "ua" }) {

  const t = getDictionary(lang)

  const [open, setOpen] = useState<number | null>(null)

  return (
    <section id="faq" className="py-24 bg-[var(--section)]">

      <div className="max-w-4xl mx-auto px-6">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {t.faq.title}
        </h2>

        <div className="space-y-4">

          {t.faq.items.map((faq, i) => (

            <div
              key={i}
              className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--card)]"
            >

              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="
                  w-full
                  text-left
                  p-5
                  font-semibold
                  flex
                  justify-between
                  items-center
                "
              >
                {faq.question}

                <span className="text-[var(--accent)] text-xl">
                  {open === i ? "−" : "+"}
                </span>

              </button>

              {open === i && (

                <div className="px-5 pb-5 text-[var(--text-secondary)] leading-relaxed">
                  {faq.answer}
                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}