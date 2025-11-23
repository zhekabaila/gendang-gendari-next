import { cookies } from 'next/headers'
import { AdminPembeliManagement } from './_layouts/home-layout'

async function HomePage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  return <AdminPembeliManagement token={token?.value!} />
}

export default HomePage
