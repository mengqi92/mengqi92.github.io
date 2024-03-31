import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MarkdownPost } from "@/app/_components/markdown-post";
import { allDocuments } from 'contentlayer/generated';
import '@/lib/katex/katex.min.css'
import Container from "@/app/_components/container";
import { PostHeader } from "@/app/_components/post-header";
import { parseISO } from "date-fns";

function getPostBySlug(slug: string) {
    const doc = allDocuments.find((doc) => doc.slugAsParams === slug);

    if (!doc) notFound()

    return doc;
}

export default function page({ params }) {
    const post = getPostBySlug(params.slug);
    return (
        <main>
            <Container>
                <article className="mx-auto max-w-3xl prose md:prose-lg lg:prose-xl dark:prose-invert mb-32">
                    <PostHeader post={post} />
                    <MarkdownPost code={post!.body.code} />
                </article>
            </Container>
        </main>
    )
}

export function generateMetadata({ params }): Metadata {
    const post = getPostBySlug(params.slug);

    if (!post) {
        return notFound();
    }

    return {
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

export async function generateStaticParams() {
    return [{ "year": "2016", "month": "06", "day": "23", "slug": "wishful-thinking" },
    { "year": "2021", "month": "02", "day": "23", "slug": "personal-finance-101-xnpv" },
    { "year": "2020", "month": "07", "day": "19", "slug": "personal-finance-101-rate-of-return" },
    { "year": "2015", "month": "10", "day": "05", "slug": "logistic-regression" },
    { "year": "2016", "month": "06", "day": "22", "slug": "linear-algebra-5" },
    { "year": "2016", "month": "06", "day": "20", "slug": "linear-algebra-4" },
    { "year": "2016", "month": "07", "day": "01", "slug": "linear-algebra-6" },
    { "year": "2016", "month": "05", "day": "20", "slug": "linear-algebra-3" },
    { "year": "2016", "month": "05", "day": "03", "slug": "linear-algebra-1" },
    { "year": "2016", "month": "05", "day": "14", "slug": "linear-algebra-2" },
    { "year": "2020", "month": "07", "day": "17", "slug": "hide-files-from-git" },
    { "year": "2018", "month": "09", "day": "18", "slug": "git-housekeeping" },
    { "year": "2018", "month": "05", "day": "09", "slug": "haskell-notes-1-basic-and-typeclass" },
    { "year": "2015", "month": "10", "day": "11", "slug": "gabor" },
    { "year": "2015", "month": "10", "day": "06", "slug": "convolution" },
    { "year": "2015", "month": "10", "day": "13", "slug": "Ein-Eout" },
    { "year": "2015", "month": "10", "day": "06", "slug": "complex" },
    { "year": "2015", "month": "10", "day": "03", "slug": "think-statistics-note" }]
}