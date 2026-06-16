import { useRouter } from "next/router";
import blogPosts from "@/data/blogPosts";
import ContentLayout from "@/components/layout/ContentLayout";
import { motion } from "framer-motion";

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;

  const post = blogPosts.find((p) => p.id === id);

  if (!post)
    return (
      <p className="p-10 text-chocolate dark:text-orange-200/75">Loading...</p>
    );
  const paragraphVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        delay: i * 0.1,
        ease: "easeOut",
      },
    }),
  };

  return (
    <ContentLayout>
      <div className="max-w-4xl mx-auto p-10 rounded-2xl shadow-lg mb-10 bg-white/70 dark:bg-white/5 dark:border dark:border-orange-200/15">
        <motion.img
          src={post.image}
          alt={post.title}
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="rounded-xl w-full h-96 object-cover shadow-md mb-8"
        />

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-chocolate dark:text-orange-200 mb-4"
        >
          {post.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-gray-500 dark:text-orange-200/60 mb-8"
        >
          {new Date(post.date).toLocaleDateString("en-GB")}
        </motion.p>

        <article className="space-y-6">
          {(Array.isArray(post.content)
            ? post.content
            : post.content
                .split(/\n\n+/)
                .map((p) => p.trim())
                .filter(Boolean)
          ).map((para, i) => (
            <motion.p
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={paragraphVariants}
              className="text-chocolate/80 dark:text-orange-200/75 leading-relaxed text-base md:text-lg font-medium"
            >
              {para}
            </motion.p>
          ))}
        </article>
      </div>
    </ContentLayout>
  );
}
