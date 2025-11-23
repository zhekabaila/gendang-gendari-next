'use server'

import { UserResponse } from '@/lib/types'
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export const saveToken = (token: string, user: UserResponse, remember?: boolean) => {
  return new Promise((resolve) => {
    cookies().set({
      name: 'token',
      value: token,
      httpOnly: true,
      maxAge: remember ? 60 * 60 * 24 * 7 : undefined
    })

    cookies().set({
      name: 'user',
      value: JSON.stringify(user),
      httpOnly: true,
      maxAge: remember ? 60 * 60 * 24 * 7 : undefined
    })

    resolve('Successfully saved')
  })
}

export const removeToken = () => {
  cookies().delete('token')
  cookies().delete('user')

  redirect('/')
}
