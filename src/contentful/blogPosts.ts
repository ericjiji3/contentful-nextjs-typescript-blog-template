import { TypeBlogPostSkeleton } from './types'
import { Entry } from 'contentful'
import { Document as RichTextDocument } from '@contentful/rich-text-types'
import contentfulClient from './contentfulClient'
import { ContentImage, parseContentfulContentImage } from './contentImage'

type BlogPostEntry = Entry<TypeBlogPostSkeleton, undefined, string>

// Our simplified version of a BlogPost.
// We don't need all the data that Contentful gives us.
export interface BlogPost {
    title: string
    slug: string
    date: `${number}-${number}-${number}T${number}:${number}:${number}Z` | undefined
	content: RichTextDocument | null
	featuredImage: ContentImage | null
}

// A function to transform a Contentful blog post
// into our own BlogPost object.
export function parseContentfulBlogPost(blogPostEntry?: BlogPostEntry): BlogPost | null {
	if (!blogPostEntry) {
		return null
	}

	return {
		title: blogPostEntry.fields.title || '',
		slug: blogPostEntry.fields.slug,
        date: blogPostEntry.fields.date,
		content: blogPostEntry.fields.content || null,
		featuredImage: parseContentfulContentImage(blogPostEntry.fields.featuredImage),
	}
}

// A function to fetch all blog posts.
// Optionally uses the Contentful content preview.
interface FetchBlogPostsOptions {
	preview: boolean
}
export async function fetchBlogPosts(): Promise<BlogPost[]> {
	const contentful = contentfulClient()

	const blogPostsResult = await contentful.getEntries<TypeBlogPostSkeleton>({
		content_type: 'webDev',
		include: 2,
		order: ['fields.title'],
	})

	return blogPostsResult.items.map((blogPostEntry) => parseContentfulBlogPost(blogPostEntry) as BlogPost)
}

// A function to fetch a single blog post by its slug.
// Optionally uses the Contentful content preview.
interface FetchBlogPostOptions {
	slug: string
}
export async function fetchBlogPost({ slug }: FetchBlogPostOptions): Promise<BlogPost | null> {
	const contentful = contentfulClient()

	const blogPostsResult = await contentful.getEntries<TypeBlogPostSkeleton>({
		content_type: 'webDev',
		'fields.slug': slug,
		include: 2,
	})

	return parseContentfulBlogPost(blogPostsResult.items[0])
}