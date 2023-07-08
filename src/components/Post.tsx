import { Link } from 'react-router-dom';

interface Post {
  id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  username: string;
}

export default function Post({ post }: { post: Post }) {
  const formattedCreatedAt = new Date(post.created_at).toLocaleString();

  return (
    <Link
      to={`post/${post.id}`}
      className="p-4 border rounded-lg shadow sm:p-6 md:p-8 bg-gray-800 border-gray-700 hover:bg-gray-700"
    >
      <div className="flex">
        <h4 className="text-xl">{post.title}</h4>
        <p className="ml-auto text-gray-400 text-sm">{formattedCreatedAt}</p>
      </div>
      <p className="text-gray-400 text-sm">by {post.username}</p>
      <p className="mt-4">{post.content}</p>
    </Link>
  );
}
