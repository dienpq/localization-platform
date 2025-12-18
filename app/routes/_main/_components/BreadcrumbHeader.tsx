'use client';

import { Link } from 'react-router';
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui';
import { PAGE_ROUTES } from '~/constants/routes';
import { useBreadcrumb } from '~/providers';

export function BreadcrumbHeader() {
  const { data } = useBreadcrumb();

  const middle = data?.items ?? [];
  const hasMiddle = middle.length > 0;
  const showDropdown = middle.length > 1;

  const lastMiddle = middle[middle.length - 1];
  const restMiddle = middle.slice(0, -1);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          {data?.title ? (
            <BreadcrumbLink asChild>
              <Link to={PAGE_ROUTES.DASHBOARD}>Dashboard</Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbItem>
              <BreadcrumbPage>Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          )}
        </BreadcrumbItem>

        {(hasMiddle || data?.title) && (
          <BreadcrumbSeparator className="hidden md:block" />
        )}

        {hasMiddle && (
          <>
            {showDropdown && (
              <>
                <BreadcrumbItem className="hidden md:block">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-1">
                      <BreadcrumbEllipsis className="size-4" />
                      <span className="sr-only">Toggle menu</span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start">
                      {restMiddle.map((item) => (
                        <DropdownMenuItem key={item.title} asChild>
                          <Link to={item.url}>{item.title}</Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
              </>
            )}

            <BreadcrumbItem className="hidden md:block">
              <BreadcrumbLink asChild>
                <Link to={lastMiddle.url}>{lastMiddle.title}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbSeparator className="hidden md:block" />
          </>
        )}

        {data?.title && (
          <BreadcrumbItem>
            <BreadcrumbPage>{data.title}</BreadcrumbPage>
          </BreadcrumbItem>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
