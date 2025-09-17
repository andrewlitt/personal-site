import readingTime from 'reading-time'
import type { BlogPost } from '../types/blog'

function deriveSlug(filePath: BlogPost['file']): string {
  if (!filePath) {
    throw new Error('Expected a generated Markdown file path.')
  }

  const filename = filePath.split('/').pop()
  if (!filename) {
    throw new Error(`Unable to derive slug from path: ${filePath}`)
  }

  return filename.replace(/\.md$/i, '')
}

export default function getPostData(post: Pick<BlogPost, 'file' | 'rawContent'>) {
  const slug = deriveSlug(post.file)

  return {
    slug,
    readingTime: readingTime(post.rawContent()).text,
  }
}