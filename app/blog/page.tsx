import { Suspense } from 'react'
import { BlogLayout } from './_layouts/blog-layout'

function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogLayout />
    </Suspense>
  )
}

export default HomePage
