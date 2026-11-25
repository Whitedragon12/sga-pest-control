"use client"

import { useId, useState } from "react"
import { NumberFormatBase, usePatternFormat } from "react-number-format"
import { getDictionary } from "@/i18n"
import { PHONE_HREF, PHONE_TEXT, toLocalDigits } from "@/lib/phone"

type Field = "name" | "phone" | "service"

// the result appears below the button, which can be off-screen on small phones
function scrollToResult(el: HTMLElement | null) {
  el?.scrollIntoView({ block: "center" })
}

export default function Contact({ lang }: { lang: "ru" | "ua" }) {

  const t = getDictionary(lang)

  // the form can be on the page twice (section and popup), so ids must be unique
  const id = useId()

  const [phoneDigits, setPhoneDigits] = useState("")
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({})
  const [failed, setFailed] = useState(false)
  const [success, setSuccess] = useState("")
  const [loading, setLoading] = useState(false)

  function clearError(field: Field) {
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const phoneFormat = usePatternFormat({
    format: "+380 (##) ###-##-##",
    mask: "_",
    allowEmptyFormatting: true,
    value: phoneDigits,
    valueIsNumericString: true,
    onValueChange: (values) => {
      setPhoneDigits(values.value)
      clearError("phone")
    },
  })

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {

    e.preventDefault()

    const form = e.currentTarget
    const formData = new FormData(form)

    const name = String(formData.get("name") ?? "").trim()
    const phone = String(formData.get("phone") ?? "")
    const service = String(formData.get("service") ?? "")

    const nextErrors: Partial<Record<Field, string>> = {}

    if (name.length < 2) nextErrors.name = t.contact.nameError

    // the mask itself contains "+380", so only a full 380XXXXXXXXX counts as a number
    if (!/^380\d{9}$/.test(phone.replace(/\D/g, ""))) {
      nextErrors.phone = t.contact.phoneError
    }

    if (!service) nextErrors.service = t.contact.serviceError

    setErrors(nextErrors)
    setFailed(false)
    setSuccess("")

    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)

    try {

      const res = await fetch("/api/telegram", {
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

      if (!res.ok) throw new Error(`Request failed: ${res.status}`)

      setSuccess(t.contact.success)

      form.reset()
      setPhoneDigits("")

      setTimeout(() => {
        setSuccess("")
      }, 5000)

    } catch (err) {

      console.error(err)
      setFailed(true)

    } finally {

      setLoading(false)

    }

  }

  function fieldProps(field: Field) {
    return {
      "aria-invalid": errors[field] ? true : undefined,
      "aria-describedby": errors[field] ? `${id}-${field}` : undefined,
    }
  }

  function fieldError(field: Field) {

    if (!errors[field]) return null

    return (
      <div id={`${id}-${field}`} role="alert" className="mt-2 text-sm text-red-400">
        {errors[field]}
      </div>
    )

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

          <div>

            <input
              name="name"
              type="text"
              placeholder={t.contact.name}
              onChange={() => clearError("name")}
              {...fieldProps("name")}
              className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 focus:outline-none focus:border-[var(--accent)]"
            />

            {fieldError("name")}

          </div>

          <div>

            <NumberFormatBase
              {...phoneFormat}
              removeFormatting={(value, changeMeta) =>
                toLocalDigits(phoneFormat.removeFormatting?.(value, changeMeta) ?? "")
              }
              name="phone"
              placeholder="+380 (__) ___-__-__"
              {...fieldProps("phone")}
              className="w-full bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 focus:outline-none focus:border-[var(--accent)]"
            />

            {fieldError("phone")}

          </div>

          <div>

            <select
              name="service"
              onChange={() => clearError("service")}
              {...fieldProps("service")}
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

            {fieldError("service")}

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-semibold py-4 rounded-xl transition disabled:opacity-50"
          >

            {loading ? t.contact.sending : t.contact.submit}

          </button>

          {failed && (
            <div ref={scrollToResult} role="alert" className="text-red-400 text-center">
              {t.contact.sendError}{" "}
              <a href={PHONE_HREF} className="underline whitespace-nowrap">
                {PHONE_TEXT}
              </a>
            </div>
          )}

          {success && (
            <p ref={scrollToResult} className="text-green-400! text-center">
              {success}
            </p>
          )}

        </form>

      </div>

    </section>

  )

}