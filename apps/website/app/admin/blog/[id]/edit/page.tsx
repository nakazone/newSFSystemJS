import { prisma } from '@/lib/prisma'
import { BlogPostForm } from '@/components/admin/BlogPostForm'
import { notFound } from 'next/navigation'

export default async function EditBlogPostPage({
  params,
}: {
  params: { id: string }
}) {
  const post = await prisma.blogPost.findUnique({
    where: { id: params.id },
  })

  if (!post) {
    notFound()
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-text-dark mb-6">Edit Blog Post</h1>
      <BlogPostForm post={post} />
    </div>
  )
}
