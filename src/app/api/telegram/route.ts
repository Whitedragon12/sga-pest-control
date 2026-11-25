import { NextResponse } from "next/server"

const TOKEN = process.env.TELEGRAM_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

export async function POST(req: Request) {

  try {

    const { name, phone, service } = await req.json()

    const message = `
Новая заявка с сайта

Имя: ${name}
Телефон: ${phone}
Услуга: ${service}
`

    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: message
      })
    })

    if (!response.ok) {

      console.error("Telegram error:", response.status)

      return NextResponse.json(
        { success: false },
        { status: 502 }
      )

    }

    return NextResponse.json({ success: true })

  } catch (error) {

    console.error("Telegram error:", error)

    return NextResponse.json(
      { success: false },
      { status: 500 }
    )

  }

}