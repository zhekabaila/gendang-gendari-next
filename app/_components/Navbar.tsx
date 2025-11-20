'use client'

import { Ticket, Info, Mail, BookOpen, LayoutDashboard } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavigationProps {
  isAdmin?: boolean
}

export function Navbar({ isAdmin = false }: NavigationProps) {
  const pathname = usePathname()
  const navItems = isAdmin
    ? [
        { label: 'Dashboard', page: '/admin', icon: LayoutDashboard },
        { label: 'Tiket', page: '/admin/ticket', icon: Ticket },
        { label: 'Blog', page: '/admin/blog', icon: BookOpen }
      ]
    : [
        { label: 'Beranda', page: '/', icon: Ticket },
        { label: 'Tentang', page: '/about', icon: Info },
        { label: 'Blog', page: '/blog', icon: BookOpen },
        { label: 'Kontak', page: '/contact', icon: Mail }
      ]

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Ticket className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                SeniLokal
              </span>
              {isAdmin && <span className="text-xs text-purple-600">Admin Panel</span>}
            </div>
          </button>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.page
              return (
                <Link
                  key={item.page}
                  href={item.page}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-purple-50'
                  }`}>
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
