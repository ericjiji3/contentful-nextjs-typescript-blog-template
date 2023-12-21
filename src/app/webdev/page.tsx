
import { draftMode } from 'next/headers'
import { fetchBlogPosts } from '../../contentful/blogPosts'
import Link from 'next/link'
import Image from 'next/image'

async function Home() {
	// Fetch blog posts using the content preview
	// if draft mode is enabled:
	const blogPosts = await fetchBlogPosts()

	return (
		<main className="p-[6vw]">
			<div className="prose">
				<h1>My Contentful Blog</h1>
				<ul>
					{blogPosts.map((blogPost) => {
						return (
							<li key={blogPost.slug}>
								<Link href={`/webdev/${blogPost.slug}`}>
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
                  <h2>{blogPost.title}</h2>
                
                </Link>
							</li>
						)
					})}
				</ul>
			</div>
		</main>
	)
}

export default Home