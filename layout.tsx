import type { Metadata } from 'next'
import { Inter, Poppins, Plus_Jakarta_Sans } from 'next/font/google'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

const plusJakarta = Plus_Jakarta_Sans({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-plus-jakarta'
})

export const metadata: Metadata = {
  title: 'Eduvora - Plateforme de Formation Premium',
  description: 'Découvrez des formations, ebooks et ressources numériques de qualité',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={`${inter.variable} ${poppins.variable} ${plusJakarta.variable} font-sans bg-[#0F172A] text-white antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
