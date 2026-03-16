"use client"

import { useState } from "react"
import { PatternFormat } from "react-number-format"
import { getDictionary } from "@/i18n"

export default function Contact({ lang }: { lang: "ru" | "ua" }) {

  const t = getDictionary(lang)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    const name = formData.get("name")
    const phone = formData.get("phone")
    const service = formData.get("service")

    if (!name || !phone || !service) {

      setSuccess("")
      setError(t.contact.error)
      return

    }

    setError("")
    setLoading(true)

    await fetch("/api/telegram", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        service
      })
    })

    setLoading(false)

    setSuccess(t.contact.success)

    form.reset()

    setTimeout(() => {
      setSuccess("")
    }, 5000)

  }

  return (

    <section id="contact" className="py-24 bg-[var(--section)]">

      <div className="max-w-3xl mx-auto px-6">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          {t.contact.title}
        </h2>

        <p className="text-center text-[var(--text-secondary)] mb-12">
          {t.contact.subtitle}
        </p>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5"
        >

          <input
            name="name"
            type="text"
            placeholder={t.contact.name}
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 focus:outline-none focus:border-[var(--accent)]"
          />

          <PatternFormat
            format="+380 (##) ###-##-##"
            mask="_"
            name="phone"
            placeholder="+380 (__) ___-__-__"
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 focus:outline-none focus:border-[var(--accent)]"
            allowEmptyFormatting
          />

          <select
            name="service"
            className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 focus:outline-none focus:border-[var(--accent)]"
          >

            <option value="">
              {t.contact.serviceSelect}
            </option>

            {t.contact.services.map((service, i) => (
              <option key={i}>
                {service}
              </option>
            ))}

          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold py-4 rounded-xl transition disabled:opacity-50"
          >

            {loading ? t.contact.sending : t.contact.submit}

          </button>

          {error && (
            <p className="text-red-400 text-center">
              {error}
            </p>
          )}

          {success && (
            <p className="text-green-400 text-center">
              {success}
            </p>
          )}

        </form>

      </div>

    </section>

  )

}