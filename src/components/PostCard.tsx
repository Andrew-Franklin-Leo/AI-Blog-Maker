import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PostCardProps {
  id: string;
  title: string;
  content: string;
  created_at: string;
  metadata: { tags: string[]; category: string; readTime: number };
}

const PostCard = ({
  id,
  title,
  content,
  created_at,
  metadata,
}: PostCardProps) => {
  const preview = content
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#"))
    .slice(0, 2)
    .join("\n");

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 focus-within:ring-2 focus-within:ring-blue-500 overflow-hidden">
      <Link to={`/post/${id}`} className="block h-full outline-none p-6">
        <header className="mb-4">
          <h2 className="text-2xl font-bold dark:text-white hover:text-blue-600 mb-2">
            {title}
          </h2>
          <div className="flex gap-3 text-sm text-gray-600 dark:text-gray-400">
            <time>{new Date(created_at).toLocaleDateString()}</time>
            <span>
              • {metadata.readTime} min read • {metadata.category}
            </span>
          </div>
        </header>
        <div className="prose dark:prose-dark line-clamp-3 mb-4">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{preview}</ReactMarkdown>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex gap-2">
            {metadata.tags.map((tag) => (
              <span
                key={tag}
                className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-2 py-1 rounded text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-blue-600 font-medium">Read more →</div>
        </div>
      </Link>
    </article>
  );
};
export default PostCard;
