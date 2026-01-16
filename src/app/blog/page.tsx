import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "記事一覧 | My Blog",
  description: "ブログ記事の一覧ページ",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">記事一覧</h1>

      {posts.length === 0 ? (
        <p className="text-gray-500">まだ記事がありません。</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="border-b border-gray-200 pb-6 last:border-b-0"
            >
              <Link href={`/blog/${post.slug}`} className="block group">
                <h2 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                  <time>{post.date}</time>
                  <span className="bg-gray-100 px-2 py-0.5 rounded">
                    {post.category}
                  </span>
                </div>
                <p className="mt-2 text-gray-600">{post.description}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
