import { useRouter } from "next/router";
import blogPosts from "@/data/blogPosts";
import ContentLayout from "@/components/layout/ContentLayout";

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;

  const post = blogPosts.find((p) => p.id === id);

  if (!post) return <p className="p-10">Loading...</p>;

  return (
    <ContentLayout>
      <div className="max-w-4xl mx-auto p-10">
        <img
          src={post.image}
          alt={post.title}
          className="rounded-xl w-full h-96 object-cover shadow-md mb-8"
        />

        <h1 className="text-4xl font-bold text-chocolate mb-4">{post.title}</h1>

        <p className="text-gray-500 mb-8">
          {new Date(post.date).toLocaleDateString()}
        </p>

        <article className="prose prose-lg max-w-none text-lg font-medium">
          {post.content}
        </article>
      </div>
    </ContentLayout>
  );
}
