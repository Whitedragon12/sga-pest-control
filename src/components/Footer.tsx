import { getDictionary } from "@/i18n"

export default function Footer({ lang }: { lang: "ru" | "ua" }) {

  const t = getDictionary(lang)

  return (

    <footer className="bg-black border-t border-white/10 py-10">

      <div className="max-w-6xl mx-auto px-6 text-center">

        <p className="text-sm text-gray-400 mb-2">
          SGA Pest Control
        </p>

        <p className="text-sm text-gray-500 mb-4">
          {t.footer.company}
        </p>

        <p className="text-xs text-gray-600">
          © {new Date().getFullYear()} SGA Pest Control — {t.footer.rights}
        </p>

      </div>

    </footer>
  )
}