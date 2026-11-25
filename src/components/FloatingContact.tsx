"use client"

import { useEffect, useId, useRef, useState } from "react"
import Contact from "./Contact"
import { getDictionary } from "@/i18n"
import { PHONE_HREF } from "@/lib/phone"

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

export default function FloatingContact({ lang }: { lang: "ru" | "ua" }) {

  const t = getDictionary(lang)

  const [open, setOpen] = useState(false)
  const [barHidden, setBarHidden] = useState(false)

  const barRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = useId()

  // hide the bar while the page form or the footer is on screen
  useEffect(() => {

    const candidates: (Element | null)[] = [
      document.getElementById("contact"),
      document.querySelector("footer"),
    ]

    const targets = candidates.filter((el): el is Element => el !== null)

    const visible = new Set<Element>()

    const observer = new IntersectionObserver((entries) => {

      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target)
        else visible.delete(entry.target)
      }

      setBarHidden(visible.size > 0)

    })

    targets.forEach((el) => observer.observe(el))

    return () => observer.disconnect()

  }, [])

  // popup: lock the page, Esc to close, keep Tab inside, move focus in and back
  useEffect(() => {

    if (!open) return

    const bar = barRef.current
    const opener = openerRef.current
    const scrollY = window.scrollY
    const scrollbar = window.innerWidth - document.documentElement.clientWidth

    const style = document.body.style
    const saved = {
      position: style.position,
      top: style.top,
      width: style.width,
      paddingRight: style.paddingRight,
    }

    // position: fixed is what actually stops scrolling on iOS Safari
    style.position = "fixed"
    style.top = `-${scrollY}px`
    style.width = "100%"
    // the scrollbar disappears with the lock, so replace its width to avoid a jump
    if (scrollbar > 0) {
      style.paddingRight = `${scrollbar}px`
      if (bar) bar.style.right = `${scrollbar}px`
    }

    dialogRef.current?.focus()

    const onKeyDown = (e: KeyboardEvent) => {

      if (e.key === "Escape") {
        setOpen(false)
        return
      }

      if (e.key !== "Tab" || !dialogRef.current) return

      const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE))
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement

      if (e.shiftKey && (active === first || active === dialogRef.current)) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }

    }

    document.addEventListener("keydown", onKeyDown)

    return () => {

      document.removeEventListener("keydown", onKeyDown)

      style.position = saved.position
      style.top = saved.top
      style.width = saved.width
      style.paddingRight = saved.paddingRight
      if (bar) bar.style.right = ""

      window.scrollTo({ top: scrollY, left: 0, behavior: "instant" })

      opener?.focus({ preventScroll: true })

    }

  }, [open])

  return (
    <>
      {/* Bottom bar, only together with the mobile header (below lg). From lg up the desktop header has the phone. */}

      <div
        ref={barRef}
        inert={barHidden}
        className={`
          lg:hidden
          fixed inset-x-0 bottom-0 z-40
          flex
          bg-black shadow-[0_-1px_0_rgba(255,255,255,0.1)]
          pb-[env(safe-area-inset-bottom)]
          transition-transform duration-200
          ${barHidden ? "translate-y-full" : ""}
        `}
      >

        <a
          href={PHONE_HREF}
          className="flex-1 h-14 flex items-center justify-center bg-green-500 text-white font-semibold"
        >
          📞 {t.floating.call}
        </a>

        <button
          ref={openerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="flex-1 h-14 flex items-center justify-center bg-blue-500 text-white font-semibold"
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
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            className="bg-[var(--card)] rounded-xl w-full max-w-xl max-h-full overflow-y-auto overscroll-contain relative animate-[scaleIn_.2s_ease] focus:outline-none"
            onClick={(e) => e.stopPropagation()}
          >

            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.floating.close}
              className="absolute top-4 right-4 text-2xl"
            >
              ✕
            </button>

            <Contact lang={lang} headingId={titleId} />

          </div>

        </div>

      )}
    </>
  )
}
