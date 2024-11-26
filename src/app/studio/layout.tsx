import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio Admin',
  description: 'Admin dashboard for portfolio content management',
}

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 