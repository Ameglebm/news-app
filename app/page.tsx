"use client"
import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Search } from "lucide-react"

interface NewsItem {
  title: string
  description: string
  content: string
  pubDate: string
  image_url: string | null
  link: string
  source_id: string
}

interface NewsResponse {
  status: string
  totalResults: number
  results: NewsItem[]
}

export default function NewsPage() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNews = async (query = "atualidades do mundo") => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/news?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error("Falha ao buscar notícias")
      }
      const data: NewsResponse = await response.json()
      setNews(data.results || [])
    } catch (err) {
      setError("Erro ao carregar notícias. Por favor, tente novamente.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      fetchNews(searchTerm)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Portal de Notícias </h1>

      <div className="max-w-xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="text"
            placeholder="Pesquisar notícias (ex: política, esportes, tecnologia)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </form>
      </div>

      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{error}</div>}

<div className="flex flex-col min-h-screen">
  <div className="flex-grow">
    {isLoading ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <Card key={index} className="h-[400px]">
            <CardHeader>
              <Skeleton className="h-4 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-4 w-1/3" />
            </CardFooter>
          </Card>
        ))}
      </div>
    ) : news.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.slice(0, 9).map((item, index) => (
          <Card key={index} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle className="line-clamp-2">{item.title}</CardTitle>
              <CardDescription>{item.source_id}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              {item.image_url && (
                <div className="mb-4 aspect-video overflow-hidden rounded-md">
                  <img
                    src={item.image_url || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `/placeholder.svg?height=200&width=400&text=Imagem não disponível`
                    }}
                  />
                </div>
              )}
              <p className="text-sm line-clamp-3 mb-2">
                {item.description || item.content || "Sem descrição disponível"}
              </p>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Ler matéria completa
              </a>
            </CardContent>
            <CardFooter className="text-xs text-muted-foreground">
              Publicado em: {formatDate(item.pubDate)}
            </CardFooter>
          </Card>
        ))}
      </div>
    ) : (
      <div className="col-span-full text-center py-12">
        <p className="text-lg text-muted-foreground">Nenhuma notícia encontrada. Tente outra pesquisa.</p>
      </div>
    )}
  </div>
</div>
      <footer className="bg-background text-foreground border-t border-border">
  <div className="container mx-auto px-4 py-8 max-w-4xl">
    <p className="text-center text-muted-foreground mb-4">
      Criado pela turma de Análise e Desenvolvimento de Sistemas - Celso Lisboa RJ
    </p>
    
    <p className="text-center text-muted-foreground mb-2">Desenvolvido por:</p>
    
    <ul className="flex flex-wrap justify-center gap-2 md:gap-4 mb-6">
      <li className="text-sm md:text-base">Alisson Amegle</li>
      <li className="text-sm md:text-base">Douglas Moura</li>
      <li className="text-sm md:text-base">Karla Gonçalves</li>
      <li className="text-sm md:text-base">Gleiciane Sousa</li>
      <li className="text-sm md:text-base">Henrique Veriato</li>
      <li className="text-sm md:text-base">Andrews Simões</li>
      <li className="text-sm md:text-base">Mauricio Santana</li>
      <li className="text-sm md:text-base">William Felipe</li>
      <li className="text-sm md:text-base">Rodrigo de Souza</li>
      <li className="text-sm md:text-base">Yasmin Kibaltchich</li>
    </ul>
    
    <p className="text-center text-xs text-muted-foreground/70">
      © 2025 Todos os direitos reservados
    </p>
  </div>
</footer>
    </div>
  )
}
