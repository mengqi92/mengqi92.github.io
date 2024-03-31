'use client'

import DateFormatter from "./date-formatter";
import Image from 'next/image';
import { PostTitle } from "@/app/_components/post-title";
import { Post } from "contentlayer/generated";
import Link from "next/link";

type Props = {
  post: Post;
};

export function PostHeader({ post }: Props) {
  return (
    <>
      <PostTitle>{post.title}</PostTitle>
      <div className="flex flex-col justify-between text-sm mb-2 text-gray-500 dark:text-gray-400">
        <div className="flex justify-between items-center space-x-4">
          <div className="italic">
            <DateFormatter dateString={post.createdDate} />
          </div>
          <div className="flex flex-wrap items-center gap-1 text-red-500">
            {post.tags && post.tags.map(t => (
              <div key={t} className="hover:text-red-700 dark:bg-red-800 rounded-full px-1 py-1 dark:text-red-300">
                <Link href="/tags/[tag]" as={`/tags/${encodeURIComponent(t)}`}>
                  #{t}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* { post.coverImage && <Image src={post.coverImage!} width={756} height={504} sizes="320 640 750" alt="Cover image of the post" layout="responsive"/> } */}
      <hr className="mt-4 mb-10 border-gray-200 dark:border-gray-700" />
    </>
  );
}
