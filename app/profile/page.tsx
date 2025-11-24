import { ProfilePage } from './_layouts/home-layout'
import { cookies } from 'next/headers'

async function UserProfilePage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  return <ProfilePage token={token} />
}

export default UserProfilePage
