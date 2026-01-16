import { notFound } from "next/navigation";
import Link from "next/link";
import { getPostBySlug, getAllSlugs } from "@/lib/posts";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "記事が見つかりません" };
  }

  return {
    title: `${post.title} | My Blog`,
    description: post.description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto">
      <div className="mb-8">
        <Link
          href="/blog"
          className="text-blue-600 hover:underline text-sm mb-4 inline-block"
        >
          &larr; 記事一覧に戻る
        </Link>
        <h1 className="text-3xl font-bold mt-4">{post.title}</h1>
        <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
          <time>{post.date}</time>
          <span className="bg-gray-100 px-2 py-0.5 rounded">
            {post.category}
          </span>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 mt-3">
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
      </div>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
