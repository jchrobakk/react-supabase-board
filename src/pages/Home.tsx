import { useContext, useEffect, useState } from 'react';
import PostForm from '../components/PostForm';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';
import { UserContext } from '../layouts/RootLayout';
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

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const user = useContext(UserContext);

  async function fetchPosts() {
    await supabase
      .rpc('get_posts', { page_number: 1 })
      .then(({ error, data }) => {
        if (error) {
          console.error(error);
          toast.error(
            '🤔 Something went wrong on posts fetching. Please, try again later.'
          );
          return;
        }
        setPosts(data);
      });
  }

  useEffect(() => {
    fetchPosts();

    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'posts',
        },
        () => fetchPosts()
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="min-h-full grow">
      <h2 className="text-4xl font-bold text-center mb-10">Board</h2>
      {user.session ? (
        <PostForm />
      ) : (
        <div className="text-center">
          <h3 className="text-xl font-semibold">You are not logged in.</h3>
          <p>
            If you want to post you have to{' '}
            <Link
              to="/login"
              className="font-semibold hover:underline"
            >
              login
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
