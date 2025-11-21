import { Suspense } from 'react'
import { HomeLayout } from './_layouts/home-layout'

function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeLayout />
    </Suspense>
  )
}

export default HomePage
