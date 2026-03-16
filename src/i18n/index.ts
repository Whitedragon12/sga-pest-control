import ru from "./ru"
import ua from "./ua"

export function getDictionary(lang: "ru" | "ua") {

if (lang === "ua") {
return ua
}

return ru

}