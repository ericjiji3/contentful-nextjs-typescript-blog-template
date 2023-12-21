import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from 'contentful'

export interface TypeBlogPostFields {
	title?: EntryFieldTypes.Symbol
	slug: EntryFieldTypes.Symbol
    date?: EntryFieldTypes.Date
	content?: EntryFieldTypes.RichText
	featuredImage?: EntryFieldTypes.AssetLink
}

export type TypeBlogPostSkeleton = EntrySkeletonType<TypeBlogPostFields>

export type TypeBlogPost<Modifiers extends ChainModifiers, Locales extends LocaleCode> = Entry<
	TypeBlogPostSkeleton,
	Modifiers,
	Locales
>