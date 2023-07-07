import { UserInfo, useSession } from './hooks/useSession';
import { createContext } from 'react';

export const UserContext = createContext<UserInfo>({
  session: null,
  profile: null,
});

export default function App() {
  const userInfo = useSession();
  return (
    <>
      <UserContext.Provider value={userInfo}>
        <div>App</div>
      </UserContext.Provider>
    </>
  );
}
