import { cookies } from 'next/headers'
import { AdminTicketManagement } from './_layouts/home-layout'

async function AdminTicketManagementPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')
  
  return <AdminTicketManagement token={token?.value!} />
}

export default AdminTicketManagementPage
