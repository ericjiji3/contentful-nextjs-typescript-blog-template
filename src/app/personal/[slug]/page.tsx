
import { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { fetchBlogPost, fetchBlogPosts } from '../../../contentful/blogPosts'
import Link from 'next/link'
import RichText from '../../../contentful/RichText'
import Image from 'next/image'

interface BlogPostPageParams {
	slug: string
}

interface BlogPostPageProps {
	params: BlogPostPageParams
}

// Tell Next.js about all our blog posts so
// they can be statically generated at build time.
export async function generateStaticParams(): Promise<BlogPostPageParams[]> {
	const blogPosts = await fetchBlogPosts()

	return blogPosts.map((post) => ({ slug: post.slug }))
}

// For each blog post, tell Next.js which metadata
// (e.g. page title) to display.
export async function generateMetadata({ params }: BlogPostPageProps, parent: ResolvingMetadata): Promise<Metadata> {
	const blogPost = await fetchBlogPost({modelId: 'personal', slug: params.slug})

	if (!blogPost) {
		return notFound()
	}

	return {
		title: blogPost.title,
	}
}

// The actual BlogPostPage component.
async function BlogPostPage({ params }: BlogPostPageProps) {
	// Fetch a single blog post by slug,
	// using the content preview if draft mode is enabled:
	const blogPost = await fetchBlogPost({modelId: 'personal', slug: params.slug })
  console.log(blogPost)
	if (!blogPost) {
		// If a blog post can't be found,
		// tell Next.js to render a 404 page.
		return notFound()
	}

	return (
		<main className="p-[6vw]">
			<Link href="/webdev">← Posts</Link>
			<div className="prose mt-8 border-t pt-8">
				{/* Render the blog post image */}
				{blogPost.featuredImage && (
					<Image
						src={blogPost.featuredImage.src}
						// Use the Contentful featuredImages API to render
						// responsive featuredImages. No next/featuredImage required:
						width={300}
						height={300}
						alt={blogPost.featuredImage.alt}
					/>
				)}

				{/* Render the blog post title */}
				<h1>{blogPost.title}</h1>

				{/* Render the blog post body */}
				<RichText document={blogPost.content} />
			</div>
		</main>
	)
}

export default BlogPostPage