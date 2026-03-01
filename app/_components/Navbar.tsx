'use client'

import { removeToken } from '@/actions/auth'
import { Ticket, Mail, BookOpen, LayoutDashboard, LogOut, LogIn, HandCoins, User, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface NavigationProps {
  isAdmin?: boolean
  isLogin: boolean
}

export function Navbar({ isAdmin = false, isLogin }: NavigationProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = isAdmin
    ? [
        { label: 'Dashboard', page: '/admin', icon: LayoutDashboard },
        { label: 'Tiket', page: '/admin/ticket', icon: Ticket },
        { label: 'Blog', page: '/admin/blog', icon: BookOpen },
        { label: 'Pembelian', page: '/admin/pembelian', icon: HandCoins }
      ]
    : [
        { label: 'Beranda', page: '/', icon: Ticket },
        // { label: 'Tentang', page: '/about', icon: Info },
        { label: 'Blog', page: '/blog', icon: BookOpen },
        { label: 'Kontak', page: '/contact', icon: Mail }
      ]

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br bg-blue-500 rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
              <Ticket className="w-5 h-5 md:w-6 md:h-6 text-white" />
            </div>
            <div className="flex flex-col items-start">
              <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Tixly
              </span>
              {isAdmin && <span className="text-xs text-purple-600">Admin Panel</span>}
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-purple-50 transition-colors">
            {isMenuOpen ? <X className="w-6 h-6 text-gray-700" /> : <Menu className="w-6 h-6 text-gray-700" />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.page
              return (
                <Link
                  key={item.page}
                  href={item.page}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-purple-50'
                  }`}>
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
            {isLogin ? (
              <>
                <button
                  className="flex items-center leading-6 gap-2 px-6 py-2.5 rounded-xl transition-all bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg hover:shadow-xl hover:from-red-600 hover:to-orange-600"
                  onClick={() => {
                    removeToken()
                  }}>
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
                <Link
                  href="/profile"
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-cyan-600`}
                  title="Profile">
                  <User className="w-5 h-5" />
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-600`}>
                  <LogIn className="w-4 h-4" />
                  <span>Masuk</span>
                </Link>
                <Link
                  href="/register"
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl transition-all bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-indigo-600`}>
                  <LogIn className="w-4 h-4" />
                  <span>Daftar</span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-purple-100 pt-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.page
                return (
                  <Link
                    key={item.page}
                    href={item.page}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-purple-50'
                    }`}>
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                )
              })}

              <div className="border-t border-purple-100 my-2" />

              {isLogin ? (
                <>
                  <Link
                    href="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </Link>
                  <button
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg"
                    onClick={() => {
                      removeToken()
                      setIsMenuOpen(false)
                    }}>
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
                    <LogIn className="w-5 h-5" />
                    <span>Masuk</span>
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg">
                    <LogIn className="w-5 h-5" />
                    <span>Daftar</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
