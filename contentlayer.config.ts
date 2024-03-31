import { defineDocumentType, makeSource } from 'contentlayer/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkToc from 'remark-toc'
import remarkMermaid from 'remark-mermaidjs'

const Post = defineDocumentType(() => ({
    name: 'Post',
    filePathPattern: `**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            description: 'The title of the post',
            required: true,
        },
        category: {
            type: 'string',
            description: 'The category of the post',
            required: true
        },
        description: {
            type: 'string',
            description: 'The description of the post',
            required: true
        },
        tags: {
            type: 'list',
            of: { type: 'string' },
            default: [],
            description: 'A list of tags of the post',
            required: true
        },
        math: {
            type: 'boolean',
            default: false
        },
        coverImage: {
            type: 'string',
            required: false
        },
        createdDate: {
            type: 'date',
            description: 'The created date of the post',
            required: true,
        },
        modifiedDate: {
            type: 'date',
            description: 'The latest modified date of the post',
            required: true,
        },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => `/${doc._raw.flattenedPath}`,
        },
        slugAsParams: {
            type: 'string',
            resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
        },
        url: {
            type: 'string',
            resolve: (doc) => `/posts/${doc._raw.flattenedPath}`,
        },
    },
}))

export default makeSource({
    contentDirPath: 'src/content',
    documentTypes: [Post],
    mdx: {
        remarkPlugins: [
            remarkGfm, 
            remarkMath,
            remarkToc,
            remarkMermaid as any
        ],
        rehypePlugins: [
            rehypeSlug,
            rehypeKatex as any,
            [rehypeAutolinkHeadings, 'after'],
            [rehypePrettyCode, {
                theme: 'solarized-light',
                onVisitLine(node: { children: string | any[] }) {
                    // Prevent lines from collapsing in `display: grid` mode, and allow empty
                    // lines to be copy/pasted
                    if (node.children.length === 0) {
                        node.children = [{ type: "text", value: " " }]
                    }
                },
                onVisitHighlightedLine(node: { properties: { className: string[] } }) {
                    node.properties.className.push("line--highlighted")
                },
                onVisitHighlightedWord(node: { properties: { className: string[] } }) {
                    node.properties.className = ["word--highlighted"]
                },
            }],
        ]
    }
})