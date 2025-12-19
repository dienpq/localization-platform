import { SignInForm } from './_components';
import { CircleAlertIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate, useSearchParams } from 'react-router';
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui';
import { PAGE_ROUTES } from '~/constants/routes';

export default function SignInPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [, setCookie] = useCookies(['accessToken', 'refreshToken']);

  const error = searchParams.get('error');
  const accessToken = searchParams.get('access_token');
  const refreshToken = searchParams.get('refresh_token');

  useEffect(() => {
    if (accessToken && refreshToken) {
      setCookie('accessToken', accessToken);
      setCookie('refreshToken', refreshToken);
      void navigate(PAGE_ROUTES.DASHBOARD, { replace: true });
    }
  }, [accessToken, refreshToken]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Sign In</CardTitle>
        <CardDescription>
          Sign in to your admin account to manage the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <CircleAlertIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error || 'An unexpected error occurred during sign-in.'}
            </AlertDescription>
          </Alert>
        )}
        <SignInForm />
      </CardContent>
    </Card>
  );
}
