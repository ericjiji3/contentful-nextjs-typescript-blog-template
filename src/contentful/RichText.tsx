import { Document as RichTextDocument } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS} from '@contentful/rich-text-types'
import { ReactElement } from 'react'

type RichTextProps = {
	document: RichTextDocument | null
}
const dtrOptions = {
	renderNode: {
	  [BLOCKS.EMBEDDED_ASSET]: (node: any) => (
		<img
		  src={node.data?.target?.fields?.file?.url}
		  alt={node.data?.target?.fields?.title}
		/>
	  ),
	},
  };
  
function RichText({ document }: RichTextProps) {
	console.log('dfakdnf', document);
	if (!document) {
		return null
	}

	return <>{documentToReactComponents(document as RichTextDocument, dtrOptions)}</>
}

export default RichText