import Hero from "@/components/Hero"
import Services from "@/components/Services"
import Works from "@/components/Works"
import Advantages from "@/components/Advantages"
import Process from "@/components/Process"
import Certificates from "@/components/Certificates"
import FAQ from "@/components/FAQ"
import Contact from "@/components/Contact"
import FloatingContact from "@/components/FloatingContact"

export default function Home() {

  const lang = "ru"

  return (
    <main>
      <Hero lang={lang} />
      <Services lang={lang} />
      <Works lang={lang} />
      <Advantages lang={lang} />
      <Process lang={lang} />
      <Certificates lang={lang} />
      <FAQ lang={lang} />
      <Contact lang={lang} />
      <FloatingContact lang={lang} />
    </main>
  )
}