import { Outlet } from 'react-router-dom';
import { useSession } from '../hooks/useSession';
import { createContext } from 'react';
import { UserInfo } from '../hooks/useSession';

export const UserContext = createContext<UserInfo>({
  session: null,
  profile: null,
});

export default function RootLayout() {
  const userInfo = useSession();
  return (
    <UserContext.Provider value={userInfo}>
      <nav>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
        consequuntur nobis cupiditate ex atque velit hic tempora cum autem
        repellendus veritatis, totam, soluta illum libero itaque vel nam. Qui,
        beatae!
      </nav>
      <Outlet />
    </UserContext.Provider>
  );
}
