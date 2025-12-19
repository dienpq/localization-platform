import { Link } from 'react-router';
import GoogleIcon from '~/assets/icons/google.svg?react';
import { Button } from '~/components/ui';
import { ENVIRONMENTS } from '~/config/enviroments';
import { AUTH_ENDPOINTS } from '~/features/auth';

export function SignInForm() {
  return (
    <Button type="submit" className="w-full" asChild>
      <Link to={`${ENVIRONMENTS.API_URL}${AUTH_ENDPOINTS.SIGN_IN_WITH_GOOGLE}`}>
        <GoogleIcon />
        <span>Sign in with Google</span>
      </Link>
    </Button>
  );
}
