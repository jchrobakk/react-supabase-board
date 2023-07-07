import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useSession } from '../hooks/useSession';
import { createContext } from 'react';
import { UserInfo } from '../hooks/useSession';
import Button from '../components/Button';

export const UserContext = createContext<UserInfo>({
  session: null,
  profile: null,
});

export default function RootLayout() {
  const userInfo = useSession();
  const navigate = useNavigate();
  return (
    <UserContext.Provider value={userInfo}>
      <div className="min-h-screen bg-gray-900 text-white py-4 px-8 flex flex-col">
        <nav className="flex justify-between">
          <Link to="/">
            <h1 className="text-2xl font-semibold">Hello</h1>
          </Link>
          {userInfo.session ? (
            <div>Logged</div>
          ) : (
            <Button onClick={() => navigate('/login')}>Log in</Button>
          )}
        </nav>
        <Outlet />
      </div>
    </UserContext.Provider>
  );
}
