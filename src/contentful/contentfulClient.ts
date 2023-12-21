import { createClient } from 'contentful'

const { SPACE_ID, ACCESS_TOKEN } = process.env

// This is the standard Contentful client. It fetches
// content that has been published.
const client = createClient({
	space: SPACE_ID!,
	accessToken: ACCESS_TOKEN!,
})

// This little helper will let us switch between the two
// clients easily:
export default function contentfulClient() {

	return client
}