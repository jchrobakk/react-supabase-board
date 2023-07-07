import Button from '../components/Button';
import { useForm } from 'react-hook-form';
import { supabase } from '../supabaseClient';
import { ToastContainer, toast } from 'react-toastify';

type FormValues = {
  email: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  async function onSubmit(data: FormValues) {
    await supabase.auth.signInWithOtp({ email: data.email }).then(() => {
      toast.success('🎉 Email sent! Check your inbox', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    });
  }

  return (
    <div className="flex justify-center min-h-full grow">
      <div className="max-w-sm">
        <h2 className="text-4xl font-bold text-center mb-10">Login</h2>
        <p className="mb-4 text-center">
          We use passwordless login system. Just provide your e-mail and we will
          send you a magic link.
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white text-center"
          >
            Your email
          </label>
          <input
            type="text"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@test.io"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Valid email is required',
              },
            })}
          />
          {errors.email && (
            <p className="text-center mt-2 text-sm text-red-600 dark:text-red-500">
              {errors.email?.message}
            </p>
          )}
          <div className="flex justify-center">
            <Button className="mt-4">Send magic link</Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
