import Container from "../../_components/container";
import { PostHeader } from "../../_components/post-header";
import { MarkdownPost } from "@/app/_components/markdown-post";
import { allDocuments } from 'contentlayer/generated';
import '@/lib/katex/katex.min.css'
import { generatePostMetadata, getPostBySlug } from "@/lib/post-utils";

export default function page({params}: { params: { slug: string }}) {
  const post = getPostBySlug(params.slug);
  return (
    <main>
      <Container>
        <article className="mx-auto max-w-3xl prose md:prose-lg lg:prose-xl dark:prose-invert mb-32">
          <PostHeader post={post} />
          <MarkdownPost code={post!.body.code}/>
        </article>
      </Container>
    </main>
  )
}

export function generateMetadata(params: { params: { slug: string; }; }) {
  return generatePostMetadata(params);
}

export async function generateStaticParams() {
  return allDocuments.map(doc => ({
    slug: doc.slugAsParams
  }));
}