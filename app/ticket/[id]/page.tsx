import { TicketDetailPage } from './_layouts/home-layout'
import { cookies } from 'next/headers'

interface TicketPageProps {
  params: {
    id: string
  }
}

async function TicketPage({ params }: TicketPageProps) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  return <TicketDetailPage ticketId={params.id} token={token} />
}

export default TicketPage
