import { useForm } from 'react-hook-form';
import Button from '../components/Button';
import { supabase } from '../supabaseClient';
import { UserContext } from '../layouts/RootLayout';
import { useContext } from 'react';
import { ToastContainer, toast } from 'react-toastify';

type FormValues = {
  username: string;
};

export default function Onboarding() {
  const user = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    await supabase
      .from('user_profiles')
      .insert([
        {
          username: data.username,
          user_id: user.session?.user.id || '',
        },
      ])
      .then(({ error }) => {
        if (error) {
          console.error(error);
          toast.error(`🤔 Something went wrong. Please, try again later.`, {
            position: 'top-center',
            theme: 'colored',
          });
        }
        toast.success(`🎉 Username set! Let's begin your journey!`, {
          position: 'top-center',
          theme: 'colored',
        });
      });
  }
  return (
    <div className="min-h-full grow text-center">
      <h2 className="text-4xl font-bold text-center mb-10">Onboarding</h2>
      <p className="mb-4">
        Thanks for joining us! Please, set your username before starting your
        journey.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center"
      >
        <label
          htmlFor="username"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
        >
          Your username
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 max-w-sm"
          placeholder="crazy_joe3"
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 3,
              message: 'Username should be at least 3 characters long',
            },
            maxLength: {
              value: 16,
              message: 'Username should be no longer than 16 characters',
            },
            pattern: {
              // ^[a-zA-Z0-9_]+$
              value: /^[a-zA-Z0-9_]+$/,
              message: 'Username should contain only letters, numbers and _',
            },
          })}
        />
        {errors.username && (
          <p className="text-center mt-2 text-sm text-red-600 dark:text-red-500">
            {errors.username?.message}
          </p>
        )}
        <Button className="mt-4">Start your journey!</Button>
      </form>
      <ToastContainer />
    </div>
  );
}
