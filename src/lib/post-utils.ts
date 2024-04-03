import { allDocuments } from "contentlayer/generated";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export function getPostBySlug(slug: string) {
    const doc = allDocuments.find((doc) => doc.slugAsParams === slug);

    if (!doc) notFound()

    return doc;
}

export function generatePostMetadata({ params }: { params: { slug: string } }): Metadata {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return notFound();
    }

    return {
        metadataBase: new URL('https://mengqi92.github.io'),
        title: post.title,
        description: post.description,
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.description,
            images: post.coverImage ? [post.coverImage] : [],
        },
        keywords: post.tags,
        twitter: {
            card: 'summary',
            site: '@mengqipei',
            creator: 'Mengqi Pei',
            images: post.coverImage ? [post.coverImage] : [],
        }
    };
}
