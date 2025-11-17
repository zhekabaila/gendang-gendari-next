import { TicketDetailPage } from './_layouts/home-layout'

interface TicketPageProps {
  params: {
    id: string
  }
}

function TicketPage({ params }: TicketPageProps) {
  return <TicketDetailPage ticketId={params.id} />
}

export default TicketPage
