import blogPosts from "@/data/blogPosts";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-4xl font-bold text-chocolate mb-10 mt-20  pb-3">
        Latest Blog Posts
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogPosts.map(post => (
          <Link key={post.id} href={`/blog/${post.id}`}>
            <div className="rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer bg-gray-100 flex flex-col h-full">
              <img
                src={post.image}
                alt={post.title}
                className="rounded-t-xl h-96 w-full object-fit-cover"
              />

              <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-chocolate mb-2">
                  {post.title}
                </h2>

                <p className="text-gray-600 mb-4">{post.excerpt}</p>

                <p className="text-sm text-gray-500">
                  {new Date(post.date).toLocaleDateString("en-GB")}

                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
