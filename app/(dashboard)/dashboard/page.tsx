'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Video, 
  Download, 
  Clock, 
  Star,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface UserStats {
  total_courses: number
  completed_courses: number
  downloaded_resources: number
  hours_learned: number
}

interface RecentResource {
  id: string
  title: string
  type: string
  thumbnail_url: string
  progress?: number
  last_accessed: string
}

export default function Dashboard() {
  const [stats, setStats] = useState<UserStats>({
    total_courses: 0,
    completed_courses: 0,
    downloaded_resources: 0,
    hours_learned: 0
  })
  const [recentResources, setRecentResources] = useState<RecentResource[]>([])
  const [user, setUser] = useState<any>(null)
  
  const supabase = createClient()

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)

    const { data: statsData } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', user?.id)
      .single()

    if (statsData) {
      setStats(statsData)
    }

    const { data: recentData } = await supabase
      .from('user_progress')
      .select(`
        resource_id,
        progress,
        last_accessed,
        resources (
          id,
          title,
          type,
          thumbnail_url
        )
      `)
      .eq('user_id', user?.id)
      .order('last_accessed', { ascending: false })
      .limit(4)

    if (recentData) {
      setRecentResources(recentData.map((item: any) => ({
        id: item.resources.id,
        title: item.resources.title,
        type: item.resources.type,
        thumbnail_url: item.resources.thumbnail_url,
        progress: item.progress,
        last_accessed: item.last_accessed
      })))
    }
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">
            Bonjour, {user?.user_metadata?.full_name || 'Apprenant'} 👋
          </h1>
          <p className="text-gray-400">
            Continuez votre apprentissage là où vous vous êtes arrêté
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-4 mb-8">
          {[
            { icon: BookOpen, label: 'Formations', value: stats.total_courses },
            { icon: Star, label: 'Terminées', value: stats.completed_courses },
            { icon: Download, label: 'Téléchargements', value: stats.downloaded_resources },
            { icon: Clock, label: "Heures d'apprentissage", value: stats.hours_learned },
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-3xl font-bold font-heading">{stat.value}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold font-heading">
              Continuer l'apprentissage
            </h2>
            <Link href="/dashboard/my-courses">
              <Button variant="ghost" className="gap-2">
                Voir tout <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          {recentResources.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {recentResources.map((resource) => (
                <Link key={resource.id} href={`/resource/${resource.id}`}>
                  <Card className="group hover:border-primary/50 transition-all cursor-pointer">
                    <div className="relative overflow-hidden rounded-t-xl">
                      <Image
                        src={resource.thumbnail_url || '/placeholder.jpg'}
                        alt={resource.title}
                        width={400}
                        height={225}
                        className="aspect-video object-cover group-hover:scale-105 transition-transform"
                      />
                      {resource.progress && resource.progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                          <div 
                            className="h-full bg-primary transition-all"
                            style={{ width: `${resource.progress}%` }}
                          />
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm mb-1 truncate">
                        {resource.title}
                      </h3>
                      <p className="text-xs text-gray-400">
                        {resource.type === 'video' ? 'Vidéo' : resource.type === 'ebook' ? 'Ebook' : 'Ressource'}
                        {resource.progress && ` • ${Math.round(resource.progress)}% complété`}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-400 mb-4">
                  Vous n'avez pas encore commencé de formation
                </p>
                <Link href="/catalogue">
                  <Button>
                    Explorer le catalogue
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/catalogue">
            <Card className="hover:border-primary/50 transition-all cursor-pointer">
              <CardContent className="py-8 text-center">
                <BookOpen className="mx-auto h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Parcourir le catalogue</h3>
                <p className="text-sm text-gray-400">
                  Découvrez de nouvelles formations et ressources
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/downloads">
            <Card className="hover:border-primary/50 transition-all cursor-pointer">
              <CardContent className="py-8 text-center">
                <Download className="mx-auto h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Mes téléchargements</h3>
                <p className="text-sm text-gray-400">
                  Accédez à vos ressources téléchargées
                </p>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/favorites">
            <Card className="hover:border-primary/50 transition-all cursor-pointer">
              <CardContent className="py-8 text-center">
                <Star className="mx-auto h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">Mes favoris</h3>
                <p className="text-sm text-gray-400">
                  Retrouvez vos ressources sauvegardées
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}
