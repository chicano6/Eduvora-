'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Users,
  BookOpen,
  Download,
  DollarSign,
  Plus,
  Edit,
  Trash2,
  Upload
} from 'lucide-react'
import { toast } from 'sonner'

interface AdminStats {
  total_users: number
  total_resources: number
  total_downloads: number
  revenue: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats>({
    total_users: 0,
    total_resources: 0,
    total_downloads: 0,
    revenue: 0
  })
  const [activeTab, setActiveTab] = useState<'overview' | 'resources' | 'users'>('overview')
  const [resources, setResources] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  
  const supabase = createClient()

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    const { data: statsData } = await supabase
      .from('admin_stats')
      .select('*')
      .single()
    
    if (statsData) setStats(statsData)

    const { data: resourcesData } = await supabase
      .from('resources')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (resourcesData) setResources(resourcesData)

    const { data: usersData } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (usersData) setUsers(usersData)
  }

  const deleteResource = async (id: string) => {
    const { error } = await supabase
      .from('resources')
      .delete()
      .eq('id', id)

    if (error) {
      toast.error('Erreur lors de la suppression')
      return
    }

    toast.success('Ressource supprimée')
    fetchAdminData()
  }

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold font-heading mb-2">
              Administration
            </h1>
            <p className="text-gray-400">
              Gérez votre plateforme Eduvora
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={activeTab === 'overview' ? 'default' : 'outline'}
              onClick={() => setActiveTab('overview')}
            >
              Vue d'ensemble
            </Button>
            <Button
              variant={activeTab === 'resources' ? 'default' : 'outline'}
              onClick={() => setActiveTab('resources')}
            >
              Ressources
            </Button>
            <Button
              variant={activeTab === 'users' ? 'default' : 'outline'}
              onClick={() => setActiveTab('users')}
            >
              Utilisateurs
            </Button>
          </div>
        </div>

        {activeTab === 'overview' && (
          <>
            <div className="grid gap-4 md:grid-cols-4 mb-8">
              {[
                { icon: Users, label: 'Utilisateurs', value: stats.total_users, change: '+12%' },
                { icon: BookOpen, label: 'Ressources', value: stats.total_resources, change: '+5%' },
                { icon: Download, label: 'Téléchargements', value: stats.total_downloads, change: '+23%' },
                { icon: DollarSign, label: 'Revenus', value: `${stats.revenue}€`, change: '+18%' },
              ].map((stat, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-2">
                      <stat.icon className="h-5 w-5 text-primary" />
                      <span className="text-xs text-green-400">{stat.change}</span>
                    </div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <p className="text-2xl font-bold font-heading">{stat.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Ajouter une formation
                  </Button>
                  <Button className="w-full gap-2" variant="outline">
                    <Upload className="h-4 w-4" />
                    Upload de ressources
                  </Button>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm">
                    Les statistiques détaillées seront disponibles prochainement
                  </p>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {activeTab === 'resources' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold font-heading">
                Gestion des ressources
              </h2>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Nouvelle ressource
              </Button>
            </div>

            <div className="space-y-4">
              {resources.map((resource) => (
                <Card key={resource.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={resource.thumbnail_url || '/placeholder.jpg'}
                        alt={resource.title}
                        className="h-16 w-28 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-semibold">{resource.title}</h3>
                        <p className="text-sm text-gray-400">
                          {resource.type} • {resource.category}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => deleteResource(resource.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div>
            <h2 className="text-2xl font-bold font-heading mb-4">
              Gestion des utilisateurs
            </h2>

            <div className="space-y-4">
              {users.map((user) => (
                <Card key={user.id}>
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-4">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <Users className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          {user.full_name || 'Utilisateur'}
                        </h3>
                        <p className="text-sm text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        user.role === 'admin' 
                          ? 'bg-primary/20 text-primary' 
                          : 'bg-gray-500/20 text-gray-400'
                      }`}>
                        {user.role || 'user'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
