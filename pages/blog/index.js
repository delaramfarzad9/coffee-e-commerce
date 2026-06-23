import blogPosts from "@/data/blogPosts";
import Link from "next/link";
import ContentLayout from "@/components/layout/ContentLayout";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

export default function BlogPage() {
  const router = useRouter();
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };
  return (
    <ContentLayout>
      <div className="max-w-6xl mx-auto p-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-4xl font-bold text-chocolate dark:text-orange-200 mb-10 pb-3 border-b border-chocolate/20 dark:border-orange-200/20"
        >
          Latest Blog Posts
        </motion.h1>
        {/* Blog Grid with Stagger Animation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
            >
              <Link
                key={post.id}
                href={{
                  pathname: "/blog/[id]",
                  query: { id: post.id, from: router.asPath },
                }}
              >
                <div className="rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer bg-chocolate/20 dark:bg-white/5 dark:border dark:border-orange-200/15 flex flex-col h-full">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="rounded-t-xl h-96 w-full object-fit-cover"
                  />

                  <div className="p-5 flex flex-col grow">
                    <h2 className="text-xl font-bold text-chocolate dark:text-orange-200 mb-2">
                      {post.title}
                    </h2>

                    <p className="text-gray-600 dark:text-orange-200/75 mb-4">
                      {post.excerpt}
                    </p>

                    <p className="text-sm text-gray-500 dark:text-orange-200/60">
                      {new Date(post.date).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </ContentLayout>
  );
}
