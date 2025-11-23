import { cookies } from 'next/headers'
import { AdminBlogManagement } from './_layouts/home-layout'

async function HomePage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')

  return <AdminBlogManagement token={token?.value!} />
}

export default HomePage
