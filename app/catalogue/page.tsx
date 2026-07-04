'use client'

import { useState, useEffect } from 'react'
import { Search, Grid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

interface Resource {
  id: string
  title: string
  description: string
  type: 'video' | 'ebook' | 'resource'
  price: number
  thumbnail_url: string
  category: string
  rating: number
  students_count: number
}

export default function Catalogue() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const supabase = createClient()

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    const { data, error } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      setResources(data)
    }
    setLoading(false)
  }

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(search.toLowerCase()) ||
      resource.description.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === 'all' || resource.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="border-b border-white/10">
        <div className="container py-8">
          <h1 className="text-4xl font-bold font-heading mb-2">Catalogue</h1>
          <p className="text-gray-400">Découvrez toutes nos ressources premium</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-[#1E293B] border-white/10"
            />
          </div>
          <div className="flex gap-2">
            {[
              { value: 'all', label: 'Tout' },
              { value: 'video', label: 'Vidéos' },
              { value: 'ebook', label: 'Ebooks' },
              { value: 'resource', label: 'Ressources' },
            ].map((filter) => (
              <Button
                key={filter.value}
                variant={typeFilter === filter.value ? 'default' : 'outline'}
                onClick={() => setTypeFilter(filter.value)}
                size="sm"
              >
                {filter.label}
              </Button>
            ))}
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('grid')}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="icon"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <div className="aspect-video bg-[#1E293B] rounded-t-xl" />
                <CardContent className="p-6">
                  <div className="h-4 bg-[#1E293B] rounded w-3/4 mb-4" />
                  <div className="h-3 bg-[#1E293B] rounded w-full mb-2" />
                  <div className="h-3 bg-[#1E293B] rounded w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            : "space-y-4"
          }>
            {filteredResources.map((resource) => (
              <Link key={resource.id} href={`/resource/${resource.id}`}>
                <Card className={`group hover:border-primary/50 transition-all duration-300 cursor-pointer ${
                  viewMode === 'list' ? 'flex' : ''
                }`}>
                  <div className={`relative overflow-hidden rounded-t-xl ${
                    viewMode === 'list' ? 'w-48 flex-shrink-0 rounded-l-xl rounded-tr-none' : ''
                  }`}>
                    <Image
                      src={resource.thumbnail_url || '/placeholder.jpg'}
                      alt={resource.title}
                      width={400}
                      height={225}
                      className="aspect-video object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2">
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary backdrop-blur-sm">
                        {resource.type === 'video' ? 'Vidéo' : resource.type === 'ebook' ? 'Ebook' : 'Ressource'}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-2 font-heading group-hover:text-primary transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2 mb-4">
                        {resource.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          {formatPrice(resource.price)}
                        </span>
                        <div className="flex items-center text-sm text-gray-400">
                          <span className="text-yellow-500 mr-1">★</span>
                          {resource.rating}
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
