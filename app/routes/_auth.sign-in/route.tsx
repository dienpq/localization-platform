import { SignInForm } from './_components';
import { CircleAlertIcon } from 'lucide-react';
import { useSearchParams } from 'react-router';
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

export default function SignInPage() {
  const [searchParams] = useSearchParams();
  const error = searchParams.get('error');

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
            <AlertTitle>
              {error === 'AccessDenied' ? 'Access Denied' : 'Error'}
            </AlertTitle>
            <AlertDescription>
              {error === 'AccessDenied'
                ? 'You do not have permission to access this resource.'
                : 'An unexpected error occurred during login. Please try again.'}
            </AlertDescription>
          </Alert>
        )}
        <SignInForm />
      </CardContent>
    </Card>
  );
}
