import { SignInForm } from './_components';
import { CircleAlertIcon } from 'lucide-react';
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

export default async function SignInPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Admin Login</CardTitle>
        <CardDescription>
          Sign in to your admin account to manage the website.
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
