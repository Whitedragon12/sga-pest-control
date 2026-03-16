"use client"

import { useState } from "react"
import { getDictionary } from "@/i18n"

export default function Certificates({ lang }: { lang: "ru" | "ua" }) {

  const t = getDictionary(lang)
  const [open, setOpen] = useState(false)

  return (
    <>
      <section id="certificates" className="py-24 bg-[var(--section)]">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* TEXT */}

            <div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t.certificates.title}
              </h2>

              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                {t.certificates.text}
              </p>

              <ul className="space-y-3">

                {t.certificates.items.map((item, i) => (

                  <li
                    key={i}
                    className="flex items-center gap-2 text-[var(--text-secondary)]"
                  >
                    <span className="text-[var(--accent)]">✔</span>
                    {item}
                  </li>

                ))}

              </ul>

            </div>


            {/* IMAGE */}

            <div className="flex justify-center">

              <img
                src="/certificate.jpg"
                alt={t.certificates.imageAlt}
                className="w-full max-w-md h-auto rounded-xl cursor-pointer hover:scale-105 transition"
                onClick={() => setOpen(true)}
              />

            </div>

          </div>

        </div>

      </section>


      {/* MODAL */}

      {open && (

        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setOpen(false)}
        >

          <img
            src="/certificate.jpg"
            alt={t.certificates.imageAlt}
            className="max-h-[85vh] max-w-[95vw] object-contain rounded-xl shadow-2xl"
          />

        </div>

      )}

    </>
  )
}