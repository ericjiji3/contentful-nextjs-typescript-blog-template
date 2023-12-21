import { Asset, AssetLink } from 'contentful'

// Our simplified version of an image asset.
// We don't need all the data that Contentful gives us.
export interface ContentImage {
	src: string
	alt: string
	width: number
	height: number
}

// A function to transform a Contentful image asset
// into our own ContentImage object.
export function parseContentfulContentImage(
	asset?: any | { sys: AssetLink }
): ContentImage | null {

	if (!asset[0]) {
		return null
	}

	if (!('fields' in asset[0])) {
		return null
	}

	return {
		src: 'https:' + asset[0].fields.file?.url || '',
		alt: asset[0].fields.description || '',
		width: asset[0].fields.file?.details.image?.width || 0,
		height: asset[0].fields.file?.details.image?.height || 0,
	}
}