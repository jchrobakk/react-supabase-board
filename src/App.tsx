import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import Home from './pages/Home';
import Onboarding from './pages/Onboarding';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import AuthRoute from './components/AuthRoute';

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
        path: 'onboarding',
        element: (
          <AuthRoute>
            <Onboarding />
          </AuthRoute>
        ),
      },
      {
        path: '*',
        element: <NotFound />,
      },
      {
        path: 'login',
        element: <Login />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
