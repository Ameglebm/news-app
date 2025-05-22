import { type NextRequest, NextResponse } from "next/server"

const API_KEY = "pub_d33b5f78849042f6b94969a4bac21cb7"
const BASE_URL = "https://newsdata.io/api/1/latest"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get("q") || "atualidades do mundo"

  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&q=${encodeURIComponent(query)}&language=pt`)

    if (!response.ok) {
      throw new Error(`API returned status: ${response.status}`)
    }

    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching news:", error)
    return NextResponse.json({ error: "Falha ao buscar notícias" }, { status: 500 })
  }
}
