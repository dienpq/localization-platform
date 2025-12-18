import { createContext, useCallback, useContext } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import { PAGE_ROUTES } from '~/constants/routes';
import {
  type GetCurrentUserResponse,
  useGetCurrentUser,
  useSignInWithGoogle,
} from '~/features/auth';

interface AuthContextType {
  user?: GetCurrentUserResponse;
  isSignInLoading: boolean;
  fetchUser: () => Promise<void> | void;
  signInWithGoogle: () => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [, setCookie, removeCookie] = useCookies([
    'accessToken',
    'refreshToken',
  ]);

  const { data: user, refetch: refetchUser } = useGetCurrentUser();
  const { mutate: onLogin, isPending: isSignInLoading } = useSignInWithGoogle();

  const fetchUser = useCallback(() => {
    void refetchUser();
  }, [refetchUser]);

  const signInWithGoogle = () => {
    onLogin(undefined, {
      onSuccess: ({ accessToken, refreshToken }) => {
        setCookie('accessToken', accessToken);
        setCookie('refreshToken', refreshToken);
        void navigate(PAGE_ROUTES.DASHBOARD);
      },
    });
  };

  const signOut = () => {
    removeCookie('accessToken');
    removeCookie('refreshToken');
    void navigate(PAGE_ROUTES.AUTH.LOGIN);
  };

  return (
    <AuthContext.Provider
      value={{ user, isSignInLoading, fetchUser, signInWithGoogle, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
