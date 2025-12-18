import { ProfileDialog } from './ProfileDialog';
import { BadgeCheck, ChevronsUpDown, LogOut } from 'lucide-react';
import { useState } from 'react';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '~/components/ui';
import { useGetProfile } from '~/features/auth';
import { getAvatarInitials } from '~/lib/utils';
import { useAuth } from '~/providers';

export const NavUser = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { isMobile } = useSidebar();
  const { signOut } = useAuth();

  const { data: profile } = useGetProfile();

  return (
    <>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={profile?.avatarUrl ?? ''}
                    alt={profile?.name ?? ''}
                  />
                  <AvatarFallback className="rounded-lg uppercase">
                    {profile?.name ? getAvatarInitials(profile.name) : ''}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{profile?.name}</span>
                  <span className="truncate text-xs">{profile?.email}</span>
                </div>
                <ChevronsUpDown className="ml-auto size-4" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
              side={isMobile ? 'bottom' : 'right'}
              align="end"
              sideOffset={4}
            >
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                  <Avatar className="h-8 w-8 rounded-lg">
                    <AvatarImage
                      src={profile?.avatarUrl ?? ''}
                      alt={profile?.name ?? ''}
                    />
                    <AvatarFallback className="rounded-lg">
                      {profile?.name ? getAvatarInitials(profile.name) : ''}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {profile?.name}
                    </span>
                    <span className="truncate text-xs">{profile?.email}</span>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  <BadgeCheck />
                  Profile
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  signOut();
                }}
              >
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      {profile && (
        <ProfileDialog profile={profile} open={open} setOpen={setOpen} />
      )}
    </>
  );
};
