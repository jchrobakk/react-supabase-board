import Button from '../components/Button';

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-full grow">
      <div className="mb-20">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@test.io"
          required
        ></input>

        <Button className="mt-4">Send magic link</Button>
      </div>
    </div>
  );
}
