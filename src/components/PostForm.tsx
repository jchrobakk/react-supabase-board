import { supabase } from '../supabaseClient';
import Button from './Button';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type FormValues = {
  title: string;
  content: string;
};

export default function PostForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    await supabase
      .from('posts')
      .insert({
        title: data.title,
        content: data.content,
      })
      .then(({ error }) => {
        if (error) {
          console.error(error);
          toast.error(`🤔 Something went wrong. Please, try again later.`);
          return;
        }
        toast.success(`🎉 Post created! Let's start a discussion!`);
        reset();
      });
  }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          htmlFor="title"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Post title
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="My first post"
          {...register('title', {
            required: 'Title is required',
            minLength: {
              value: 3,
              message: 'Title must be at least 3 characters long',
            },
            maxLength: {
              value: 100,
              message: 'Title must be no longer than 100 characters',
            },
          })}
        />
        {errors.title && (
          <p className="text-sm text-red-600 dark:text-red-500 mt-2">
            {errors.title?.message}
          </p>
        )}
        <label
          htmlFor="content"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
        >
          Post content
        </label>
        <textarea
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          rows={5}
          placeholder="This is my first post. I'm so excited!"
          {...register('content', {
            required: 'Content is required',
            minLength: {
              value: 3,
              message: 'Content must be at least 3 characters long',
            },
            maxLength: {
              value: 1000,
              message: 'Content must be no longer than 1000 characters',
            },
          })}
        />
        {errors.content && (
          <p className="text-sm text-red-600 dark:text-red-500 mt-2">
            {errors.content?.message}
          </p>
        )}

        <Button
          type="submit"
          className="mt-4"
        >
          Add Post
        </Button>
      </form>
    </div>
  );
}
