import { BlogPostForm } from '@/components/admin/BlogPostForm'

export default function NewBlogPostPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-text-dark mb-6">Create New Blog Post</h1>
      <BlogPostForm />
    </div>
  )
}
