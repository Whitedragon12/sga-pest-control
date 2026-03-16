"use client"

import { Bug, Rat, ShieldPlus, SprayCan } from "lucide-react"
import { getDictionary } from "@/i18n"

export default function Services({ lang }: { lang: "ru" | "ua" }) {

  const t = getDictionary(lang)

  const services = [
    {
      icon: Bug,
      title: t.services.disinfection.title,
      text: t.services.disinfection.text
    },
    {
      icon: Rat,
      title: t.services.deratization.title,
      text: t.services.deratization.text
    },
    {
      icon: ShieldPlus,
      title: t.services.disinfection2.title,
      text: t.services.disinfection2.text
    },
    {
      icon: SprayCan,
      title: t.services.fumigation.title,
      text: t.services.fumigation.text
    }
  ]

  return (
    <section id="services" className="py-24 bg-[var(--section)]">

      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          {t.services.title}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service, i) => {

            const Icon = service.icon

            return (

              <div
                key={i}
                className="
                group
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

                <Icon
                  size={42}
                  className="
                  text-[var(--accent)]
                  mb-5
                  transition-transform
                  duration-300
                  group-hover:scale-110
                  "
                />

                <h3 className="text-lg font-semibold mb-3">
                  {service.title}
                </h3>

                <p className="text-[var(--text-secondary)] leading-relaxed text-sm">
                  {service.text}
                </p>

              </div>

            )

          })}

        </div>

      </div>

    </section>
  )
}