import { useRouter } from "next/router";
import blogPosts from "@/data/blogPosts";
import ContentLayout from "@/components/layout/ContentLayout";
import { motion } from "framer-motion";

export default function BlogDetail() {
  const router = useRouter();
  const { id } = router.query;

  const post = blogPosts.find((p) => p.id === id);

  if (!post) return <p className="p-10">Loading...</p>;
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
      <div className="max-w-4xl mx-auto p-10">
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
         className="text-4xl font-bold text-chocolate mb-4">{post.title}</motion.h1>

        <motion.p 
             initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        className="text-gray-500 mb-8">
          {new Date(post.date).toLocaleDateString()}
        </motion.p>

        <article className="prose prose-lg max-w-none text-lg font-medium">
                    {Array.isArray(post.content)
            ? post.content.map((para, i) => (
                <motion.p
                  key={i}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={paragraphVariants}
                >
                  {para}
                </motion.p>
              ))
            : (
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
              >
                {post.content}
              </motion.p>
            )}
        </article>
      </div>
    </ContentLayout>
  );
}
