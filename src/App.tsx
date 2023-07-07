import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Welcome from './pages/Welcome';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'welcome',
        element: <Welcome />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
