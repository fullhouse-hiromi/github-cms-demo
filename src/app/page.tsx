import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <div>
      <section className="mb-12">
        <h1 className="text-4xl font-bold mb-4">My Blog</h1>
        <p className="text-gray-600 text-lg">
          技術的なことや日常のことを書いています。
        </p>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">最新の記事</h2>
          <Link href="/blog" className="text-blue-600 hover:underline text-sm">
            すべての記事を見る &rarr;
          </Link>
        </div>

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
                  <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-500">
                    <time>{post.date}</time>
                    <span className="bg-gray-100 px-2 py-0.5 rounded">
                      {post.category}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{post.description}</p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
