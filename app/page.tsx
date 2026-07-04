import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Video, Download, Star, Users, Award } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Navigation */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0F172A]/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-secondary" />
            <span className="text-xl font-bold font-heading">
              Edu<span className="text-primary">vora</span>
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link href="/catalogue">
              <Button variant="ghost">Catalogue</Button>
            </Link>
            <Link href="/login">
              <Button variant="outline">Connexion</Button>
            </Link>
            <Link href="/register">
              <Button>Commencer</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/20 via-transparent to-transparent" />
        
        <div className="container relative">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight font-heading md:text-7xl">
              Apprenez sans
              <span className="gradient-text"> limites</span>
            </h1>
            <p className="mb-8 text-xl text-gray-400">
              Accédez à des formations premium, ebooks et ressources numériques
              conçus par des experts pour développer vos compétences.
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/catalogue">
                <Button size="lg" className="text-lg">
                  Explorer le catalogue
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="text-lg">
                  S'inscrire gratuitement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { icon: Users, label: 'Apprenants', value: '10,000+' },
              { icon: BookOpen, label: 'Formations', value: '500+' },
              { icon: Star, label: 'Note moyenne', value: '4.8/5' },
              { icon: Award, label: 'Experts', value: '200+' },
            ].map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="mx-auto h-8 w-8 text-primary mb-4" />
                  <div className="text-3xl font-bold font-heading">{stat.value}</div>
                  <div className="text-sm text-gray-400 mt-2">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-16 font-heading">
            Tout ce dont vous avez besoin
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Video,
                title: 'Formations Vidéo',
                description: 'Des cours en vidéo de haute qualité avec suivi de progression'
              },
              {
                icon: BookOpen,
                title: 'Ebooks Premium',
                description: 'Une bibliothèque d\'ebooks téléchargeables sur des sujets variés'
              },
              {
                icon: Download,
                title: 'Ressources Numériques',
                description: 'Templates, outils et ressources pour vos projets'
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:border-primary/50 transition-all duration-300">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <Card className="relative overflow-hidden border-primary/20">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
            <CardContent className="relative py-16 text-center">
              <h2 className="text-4xl font-bold mb-4 font-heading">
                Prêt à commencer ?
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Rejoignez des milliers d'apprenants et développez vos compétences
              </p>
              <Link href="/register">
                <Button size="lg" className="text-lg">
                  Créer un compte gratuit
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-bold mb-4">Eduvora</h3>
              <p className="text-gray-400 text-sm">
                Plateforme de formation premium pour développeurs et créatifs
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Ressources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/catalogue">Formations</Link></li>
                <li><Link href="/catalogue?type=ebook">Ebooks</Link></li>
                <li><Link href="/catalogue?type=resource">Ressources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Liens utiles</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/faq">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Légal</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/privacy">Confidentialité</Link></li>
                <li><Link href="/terms">Conditions</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-400">
            <p>&copy; 2024 Eduvora. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
