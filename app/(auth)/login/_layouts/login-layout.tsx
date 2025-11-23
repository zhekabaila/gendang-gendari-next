'use client'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { AxiosError } from 'axios'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/schemas/login'
import { saveToken } from '@/actions/auth'
import { toast } from 'sonner'
import { API } from '@/services'
import { LoaderCircle, LogIn } from 'lucide-react'
import { UserResponse } from '@/lib/types'

const LoginLayout = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      setLoading(true)

      const response = await API({
        method: 'POST',
        url: '/auth/login',
        data: {
          username: data.username,
          password: data.password
        }
      })

      const { data: userData, token, message } = response.data

      // Extract token tanpa "Bearer " prefix
      const cleanToken = token.replace('Bearer ', '')

      // Save token ke cookies
      await saveToken(cleanToken, userData as UserResponse)

      toast.success(message || 'Login berhasil')
      form.reset()
      if (userData?.role === 'ADMIN') {
        router.push('/admin') // Redirect ke home
        return
      }
      router.push('/') // Redirect ke home
    } catch (err) {
      console.error('Login error:', err)
      if (err instanceof AxiosError) {
        const errorMessage =
          (err.response?.data as { message?: string; data?: string })?.message ||
          (err.response?.data as { message?: string; data?: string })?.data ||
          err.message ||
          'Login gagal'
        toast.error(errorMessage)
      } else {
        toast.error(err instanceof Error ? err.message : 'Terjadi kesalahan')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }}
        />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo / Title Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-md rounded-full mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Masuk</h1>
          <p className="text-white/80">Selamat datang kembali di Gendang Gendari</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Username */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Username</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="text"
                        disabled={loading}
                        placeholder="Masukkan username Anda"
                        className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl py-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold">Password</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        disabled={loading}
                        placeholder="Masukkan password Anda"
                        className="bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 rounded-xl py-3"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all mt-8">
                {loading && <LoaderCircle className="w-4 h-4 animate-spin mr-2" />}
                {loading ? 'Sedang masuk...' : 'Masuk'}
              </Button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">atau</span>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center">
                <p className="text-gray-600">
                  Belum memiliki akun?{' '}
                  <Link href="/register" className="text-purple-600 font-semibold hover:text-purple-700 transition-colors">
                    Daftar sekarang
                  </Link>
                </p>
              </div>
            </form>
          </Form>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8">
          <p className="text-white/70 text-sm">Gendang Gendari © 2025</p>
        </div>
      </div>
    </div>
  )
}

export default LoginLayout
