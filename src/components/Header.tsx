"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { getDictionary } from "@/i18n"
import { PHONE_HREF, PHONE_TEXT } from "@/lib/phone"

export default function Header({ lang }: { lang: "ru" | "ua" }) {

  const [open, setOpen] = useState(false)

  const t = getDictionary(lang)

  return (

<header className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10">

<div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">

{/* LOGO */}

<Link
href={lang === "ua" ? "/" : "/ru"}
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

</Link>

{/* DESKTOP NAV */}

<nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">

<a href="#services" className="hover:text-green-400 transition">
{t.nav.services}
</a>

<a href="#process" className="hover:text-green-400 transition">
{t.nav.process}
</a>

<a href="#certificates" className="hover:text-green-400 transition">
{t.nav.certificates}
</a>

<a href="#contact" className="hover:text-green-400 transition">
{t.nav.contacts}
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

<a
href={PHONE_HREF}
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
📞 {PHONE_TEXT}
</a>

{/* MOBILE BUTTONS */}

<div className="flex items-center gap-3 md:hidden">

<a
href={PHONE_HREF}
className="bg-green-500 p-2.5 rounded-full"
>
📞
</a>

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
{t.nav.services}
</a>

<a href="#process" onClick={()=>setOpen(false)}>
{t.nav.process}
</a>

<a href="#certificates" onClick={()=>setOpen(false)}>
{t.nav.certificates}
</a>

<a href="#contact" onClick={()=>setOpen(false)}>
{t.nav.contacts}
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

<a
href={PHONE_HREF}
className="bg-green-500 py-3 rounded-lg mt-4 text-center"
>
{t.nav.call}
</a>

</div>

</div>

)}

</header>

  )
}