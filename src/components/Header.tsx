"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function Header({ lang }: { lang: "ru" | "ua" }) {

  const [open, setOpen] = useState(false)

  const handleCall = () => {

    if (typeof window === "undefined") return

    if (window.innerWidth < 768) {
      window.location.href = "tel:+380969984248"
      return
    }

    navigator.clipboard?.writeText("+380969984248")

    alert(
      lang === "ua"
        ? "Номер скопійовано: +38 (096) 998-42-48"
        : "Номер скопирован: +38 (096) 998-42-48"
    )
  }

  return (

<header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">

<div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">

{/* LOGO */}

<a
href={`/${lang}`}
className="flex items-center gap-3"
>

<Image
src="/logo.webp"
alt="SGA Pest Control"
width={44}
height={44}
className="rounded-full"
/>

<span className="text-base md:text-lg font-semibold tracking-wide">
SGA Pest Control
</span>

</a>

{/* DESKTOP NAV */}

<nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">

<a href="#services" className="hover:text-green-400 transition">
{lang === "ua" ? "Послуги" : "Услуги"}
</a>

<a href="#process" className="hover:text-green-400 transition">
{lang === "ua" ? "Процес" : "Процесс"}
</a>

<a href="#certificates" className="hover:text-green-400 transition">
{lang === "ua" ? "Сертифікати" : "Сертификаты"}
</a>

<a href="#contact" className="hover:text-green-400 transition">
{lang === "ua" ? "Контакти" : "Контакты"}
</a>

</nav>

{/* RIGHT SIDE */}

<div className="flex items-center gap-4">

{/* LANGUAGE SWITCH DESKTOP */}

<div className="hidden md:flex gap-2 text-sm">

  <Link
    href="/ru"
    className={`${lang === "ru" ? "text-green-400" : "hover:text-green-400"}`}
  >
    RU
  </Link>

  <span className="opacity-40">|</span>

  <Link
    href="/"
    className={`${lang === "ua" ? "text-green-400" : "hover:text-green-400"}`}
  >
    UA
  </Link>

</div>

{/* CALL BUTTON DESKTOP */}

<button
onClick={handleCall}
className="
hidden md:flex
items-center
gap-2
bg-green-500
hover:bg-green-600
text-white
px-4
py-2
rounded-lg
text-sm
font-medium
transition
"
>
📞 +38 (096) 998-42-48
</button>

{/* MOBILE BUTTONS */}

<div className="flex items-center gap-3 md:hidden">

<button
onClick={handleCall}
className="bg-green-500 p-2.5 rounded-full"
>
📞
</button>

<button
onClick={() => setOpen(!open)}
className="text-white"
>
{open ? <X size={26}/> : <Menu size={26}/>}
</button>

</div>

</div>

</div>

{/* MOBILE MENU */}

{open && (

<div className="md:hidden bg-black border-t border-white/10">

<div className="flex flex-col p-6 gap-5 text-lg">

<a href="#services" onClick={()=>setOpen(false)}>
{lang === "ua" ? "Послуги" : "Услуги"}
</a>

<a href="#process" onClick={()=>setOpen(false)}>
{lang === "ua" ? "Процес" : "Процесс"}
</a>

<a href="#certificates" onClick={()=>setOpen(false)}>
{lang === "ua" ? "Сертифікати" : "Сертификаты"}
</a>

<a href="#contact" onClick={()=>setOpen(false)}>
{lang === "ua" ? "Контакти" : "Контакты"}
</a>

{/* LANGUAGE SWITCH MOBILE */}

<div className="flex gap-4 mt-2">

  <Link
    href="/ru"
    className={`${lang === "ru" ? "text-green-400" : ""}`}
  >
    RU
  </Link>

  <Link
    href="/"
    className={`${lang === "ua" ? "text-green-400" : ""}`}
  >
    UA
  </Link>

</div>

<button
onClick={handleCall}
className="bg-green-500 py-3 rounded-lg mt-4"
>
{lang === "ua" ? "Подзвонити" : "Позвонить"}
</button>

</div>

</div>

)}

</header>

  )
}