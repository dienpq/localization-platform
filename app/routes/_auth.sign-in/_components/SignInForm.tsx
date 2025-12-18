import GoogleIcon from '~/assets/icons/google.svg';
import { Button } from '~/components/ui';
import { useAuth } from '~/providers';

export function SignInForm() {
  const { signInWithGoogle, isSignInLoading } = useAuth();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        signInWithGoogle();
      }}
    >
      <Button type="submit" className="w-full" isLoading={isSignInLoading}>
        <GoogleIcon />
        <span>Sign in with Google</span>
      </Button>
    </form>
  );
}
