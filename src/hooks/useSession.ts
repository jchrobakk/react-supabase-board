import { RealtimeChannel, Session } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export interface UserProfile {
  username: string;
}

export interface UserInfo {
  session: Session | null;
  profile: UserProfile | null;
}

export function useSession(): UserInfo {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<UserInfo>({
    session: null,
    profile: null,
  });

  const [channel, setChannel] = useState<RealtimeChannel | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUserInfo({ ...userInfo, session });
      supabase.auth.onAuthStateChange((_, session) => {
        setUserInfo({ session, profile: null });
      });
    });
  }, []);

  useEffect(() => {
    if (userInfo.session?.user && !userInfo.profile) {
      listenToUserProfileChanes(userInfo.session.user.id).then((newChannel) => {
        if (channel) {
          channel.unsubscribe();
        }
        setChannel(newChannel);
      });
    } else if (!userInfo.session?.user) {
      channel?.unsubscribe();
      setChannel(null);
    }
  }, [userInfo.session]);

  async function listenToUserProfileChanes(userId: string) {
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .filter('user_id', 'eq', userId);
    if (data?.[0]) {
      setUserInfo({ ...userInfo, profile: data[0] });
    } else {
      navigate('/onboarding');
    }

    return supabase
      .channel('public:user_profiles')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_profiles',
          filter: `user_id=eq.'${userId}'`,
        },
        (payload) => {
          setUserInfo({ ...userInfo, profile: payload.new as UserProfile });
        }
      )
      .subscribe();
  }

  return userInfo;
}
