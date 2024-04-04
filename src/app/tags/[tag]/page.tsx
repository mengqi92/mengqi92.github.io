import { PostList } from "@/app/_components/post-list";
import { allDocuments } from "contentlayer/generated";
import { notFound } from "next/navigation";

function getPostsByTag(tag: string) {
    const posts = allDocuments.filter(
        (doc) => {
            const tagFound = doc.tags.find((t) => t === tag);
            return tagFound ?? false;
        });

    if (!posts) notFound()

    return posts;
}

export default function page({ params }: { params: { tag: string } }) {
    const tag = decodeURIComponent(params.tag);
    const posts = getPostsByTag(tag)
    return (
        <>
            <div className="container mx-auto max-w-3xl md:px-6 py-8">
                <h1 className="text-4xl font-bold mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                    </svg>
                    {tag}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ml-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                </h1>
                {posts && posts.length > 0 ? (
                    <div className="space-y-12">
                        <PostList posts={posts} />
                    </div>
                ) : (
                    <p className="text-center text-gray-600">当前没有文章。</p>
                )}
            </div>
        </>
    );
}

export async function generateStaticParams() {
    const allTags = new Set<string>();

    allDocuments.forEach(doc => {
        doc.tags.forEach(tag => {
            allTags.add(tag);
        });
    });

    return Array.from(allTags).map(tag => ({
        tag: tag
    }));
}