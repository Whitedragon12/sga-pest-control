export async function POST(req: Request) {

  const data = await req.json()

  console.log("TELEGRAM UPDATE:", data)

  return new Response("ok")
}