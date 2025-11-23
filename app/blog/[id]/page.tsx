import { BlogDetailPage } from './_layouts/home-layout'

interface BlogPageProps {
  params: {
    id: string
  }
}

function BlogPage({ params }: BlogPageProps) {
  return <BlogDetailPage blogId={params.id} />
}

export default BlogPage
