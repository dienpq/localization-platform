import type { Route } from './+types/root';
import './app.css';
import { Button, Toaster } from './components/ui';
import { PAGE_ROUTES } from './constants/routes';
import { ReactQueryProvider, ThemeProvider } from './providers';
import { ArrowLeftIcon, HouseIcon } from 'lucide-react';
import { CookiesProvider } from 'react-cookie';
import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useNavigate,
} from 'react-router';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
  },
];

export function meta() {
  return [
    { title: 'Localization Platform' },
    {
      name: 'description',
      content: 'A platform to manage localization projects efficiently.',
    },
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <CookiesProvider defaultSetOptions={{ path: '/' }}>
              {children}
            </CookiesProvider>
          </ReactQueryProvider>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const navigate = useNavigate();

  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  const handleBack = () => {
    void navigate(-1);
  };

  return (
    <main className="container mx-auto flex min-h-svh w-full flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{message}</h1>
        <p>{details}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" onClick={handleBack}>
          <ArrowLeftIcon />
          <span>Back</span>
        </Button>
        <Button asChild>
          <Link to={PAGE_ROUTES.DASHBOARD}>
            <HouseIcon />
            <span>Dashboard</span>
          </Link>
        </Button>
      </div>
      {stack && (
        <pre className="bg-muted text-muted-foreground w-full overflow-x-auto rounded-md px-4 py-3">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
