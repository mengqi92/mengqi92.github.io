import { PostPreview } from "./post-preview";
import { DocumentTypes, Post } from ".contentlayer/generated"
import { parseISO, getYear } from 'date-fns';


type Props = {
  posts: DocumentTypes[];
};

const groupPostsByYear = (posts: Post[]) => {
  const groupedPosts: { [key: number]: Post[] } = {};

  // Group posts by year
  posts.forEach((post) => {
    const year = getYear(parseISO(post.createdDate));
    if (!groupedPosts[year]) {
      groupedPosts[year] = [];
    }
    groupedPosts[year].push(post);
  });

  // Get the sorted years in descending order
  const sortedStringYears = Object.keys(groupedPosts).sort((a, b) => parseInt(b) - parseInt(a));
  const sortedYears: number[] = sortedStringYears.map(year => parseInt(year));

  return { sortedYears, groupedPosts };
};

export function PostList({ posts }: Props) {
  const { sortedYears, groupedPosts } = groupPostsByYear(posts);

  return (
    <div className="flex flex-col gap-2 mx-auto max-w-3xl divide-y divide-dashed prose md:prose-lg lg:prose-xl dark:prose-invert">
      {
        sortedYears.map((year: number) => {
          const posts = groupedPosts[year];
          return (
            posts.map((post: Post) => (
              <PostPreview
                key={post.slug}
                title={post.title}
                date={post.createdDate}
                slug={post.slugAsParams}
                previewText="{post.previewText}"
              />))
          )
        })
      }
    </div>
  );
}
