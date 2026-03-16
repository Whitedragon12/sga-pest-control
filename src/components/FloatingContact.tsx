"use client"

import { useState } from "react"
import Contact from "./Contact"
import { getDictionary } from "@/i18n"

export default function FloatingContact({ lang }: { lang: "ru" | "ua" }) {

  const t = getDictionary(lang)

  const [open, setOpen] = useState(false)

  const handleCall = () => {

    if (typeof window === "undefined") return

    // mobile → звонок
    if (window.innerWidth < 768) {
      window.location.href = "tel:+380969984248"
      return
    }

    // desktop → копировать номер
    try {
      navigator.clipboard.writeText("+380969984248")

      alert(
        lang === "ua"
          ? "Номер скопійовано: +38 (096) 998-42-48"
          : "Номер скопирован: +38 (096) 998-42-48"
      )

    } catch {

      alert(
        lang === "ua"
          ? "Подзвоніть: +38 (096) 998-42-48"
          : "Позвоните: +38 (096) 998-42-48"
      )

    }
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">

        {/* CALL BUTTON */}

        <button
          onClick={handleCall}
          className="bg-green-500 text-white px-5 py-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          📞 {t.floating.call}
        </button>

        {/* FORM BUTTON */}

        <button
          onClick={() => setOpen(true)}
          className="bg-blue-500 text-white px-5 py-3 rounded-full shadow-lg hover:scale-110 transition"
        >
          📋 {t.floating.request}
        </button>

      </div>

      {open && (

        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
          onClick={() => setOpen(false)}
        >

          <div
            className="bg-[var(--card)] rounded-xl w-full max-w-xl relative animate-[scaleIn_.2s_ease]"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-2xl"
            >
              ✕
            </button>

            <Contact lang={lang} />

          </div>

        </div>

      )}
    </>
  )
}