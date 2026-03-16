"use client"

import { useState, useEffect, useRef } from "react"
import { getDictionary } from "@/i18n"

export default function Works({ lang }: { lang: "ru" | "ua" }) {

  const t = getDictionary(lang)

  const works = [
    "/works/pest-control-odessa-1.webp",
    "/works/pest-control-odessa-2.webp",
    "/works/pest-control-odessa-3.webp",
    "/works/pest-control-odessa-4.webp",
    "/works/pest-control-odessa-5.webp",
    "/works/pest-control-odessa-6.webp"
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const touchStartX = useRef<number | null>(null)

  useEffect(() => {

    const handleKey = (e: KeyboardEvent) => {

      if (openIndex === null) return

      if (e.key === "Escape") {
        setOpenIndex(null)
      }

      if (e.key === "ArrowRight") {
        setOpenIndex((openIndex + 1) % works.length)
      }

      if (e.key === "ArrowLeft") {
        setOpenIndex((openIndex - 1 + works.length) % works.length)
      }

    }

    window.addEventListener("keydown", handleKey)

    return () => window.removeEventListener("keydown", handleKey)

  }, [openIndex, works.length])


  return (

    <section id="works" className="py-24 bg-slate-900">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14 text-white">
          {t.works.title}
        </h2>


        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {works.map((src, i) => (

            <button
              key={i}
              onClick={() => setOpenIndex(i)}
              className="group relative overflow-hidden rounded-xl shadow-lg border border-white/10"
            >

              <img
                src={src}
                alt={t.works.alt}
                className="object-cover w-full h-72 transition duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition"></div>

            </button>

          ))}

        </div>

      </div>


      {openIndex !== null && (

        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setOpenIndex(null)}
        >

          {/* стрелка влево */}

          <button
            onClick={(e) => {
              e.stopPropagation()
              setOpenIndex((openIndex - 1 + works.length) % works.length)
            }}
            className="absolute left-6 md:left-16 text-white text-6xl md:text-8xl font-light hover:scale-110 transition"
          >
            ‹
          </button>


          {/* изображение */}

          <img
            src={works[openIndex]}
            alt={t.works.alt}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}

            onTouchStart={(e) => {
              touchStartX.current = e.touches[0].clientX
            }}

            onTouchEnd={(e) => {

              if (touchStartX.current === null) return

              const end = e.changedTouches[0].clientX
              const diff = touchStartX.current - end

              if (diff > 50) {
                setOpenIndex((openIndex + 1) % works.length)
              }

              if (diff < -50) {
                setOpenIndex((openIndex - 1 + works.length) % works.length)
              }

              touchStartX.current = null

            }}
          />


          {/* стрелка вправо */}

          <button
            onClick={(e) => {
              e.stopPropagation()
              setOpenIndex((openIndex + 1) % works.length)
            }}
            className="absolute right-6 md:right-16 text-white text-6xl md:text-8xl font-light hover:scale-110 transition"
          >
            ›
          </button>

        </div>

      )}

    </section>

  )

}