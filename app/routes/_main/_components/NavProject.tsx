'use client';

import { InviteMemberDialog } from './InviteMemberDialog';
import { ProjectDialog } from './ProjectDialog';
import { WaitingProjectDialog } from './WaitingProjectDialog';
import {
  BellIcon,
  EyeIcon,
  LogOutIcon,
  MoreHorizontal,
  PencilIcon,
  PlusIcon,
  Share2Icon,
  Trash2,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useParams } from 'react-router';
import { toast } from 'sonner';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  Skeleton,
  useSidebar,
} from '~/components/ui';
import { PAGE_ROUTES } from '~/constants/routes';
import { ProjectMemberRole } from '~/enum/project-member';
import {
  type GetAllProjectsResponse,
  useDeleteProject,
  useGetAllProjects,
  useLeaveProject,
} from '~/features/projects';
import { getAvatarInitials } from '~/lib/utils';

export const NavProject = () => {
  const { id: projectId } = useParams();
  const { isMobile } = useSidebar();

  const [open, setOpen] = useState<boolean>(false);
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openInvite, setOpenInvite] = useState<boolean>(false);
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const [project, setProject] =
    useState<GetAllProjectsResponse['data'][number]>();
  const [shareProjectId, setShareProjectId] = useState<string>('');
  const [openProjectWaiting, setOpenProjectWaiting] = useState<boolean>(false);

  const { data: projectData, isPending } = useGetAllProjects();
  const { data: waitingProjectData } = useGetAllProjects({
    status: 'WAITING',
  });
  const { mutateAsync: deleteProject } = useDeleteProject();
  const { mutateAsync: leaveProject } = useLeaveProject();

  const handleDeleteProject = (id: string) => {
    toast.promise(deleteProject(id), {
      loading: 'Deleting project...',
    });
  };

  const handleLeaveProject = (id: string) => {
    toast.promise(leaveProject(id), {
      loading: 'Leaving project...',
    });
  };

  const visibleItems = useMemo(
    () => projectData?.data.slice(0, visibleCount) ?? [],
    [projectData, visibleCount],
  );
  const hasMore = useMemo(
    () => (projectData ? projectData.data.length > visibleCount : false),
    [projectData, visibleCount],
  );

  return (
    <>
      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel className="w-full">
          <span>Projects</span>
          {!!waitingProjectData?.total && (
            <Badge
              variant="destructive"
              className="ml-2 h-5 min-w-5 cursor-pointer rounded-full px-1 font-mono tabular-nums"
              onClick={() => {
                setOpenProjectWaiting(true);
              }}
            >
              <BellIcon />
              <span>{waitingProjectData.total}</span>
            </Badge>
          )}
        </SidebarGroupLabel>
        <SidebarGroupAction
          onClick={() => {
            setOpen(true);
          }}
        >
          <PlusIcon />
        </SidebarGroupAction>
        {isPending ? (
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Skeleton className="h-8 w-full" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        ) : (
          <SidebarMenu>
            {visibleItems.map((item) => {
              const { id, logoUrl, name, role } = item;
              return (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton isActive={projectId === id} asChild>
                    <Link to={PAGE_ROUTES.PROJECTS.DETAIL(id)}>
                      <Avatar className="size-6">
                        <AvatarImage src={logoUrl ?? ''} alt={name} />
                        <AvatarFallback>
                          {getAvatarInitials(name)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{name}</span>
                    </Link>
                  </SidebarMenuButton>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <SidebarMenuAction showOnHover>
                        <MoreHorizontal />
                        <span className="sr-only">More</span>
                      </SidebarMenuAction>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="min-w-min rounded-lg"
                      side={isMobile ? 'bottom' : 'right'}
                      align={isMobile ? 'end' : 'start'}
                    >
                      <DropdownMenuItem asChild>
                        <Link to={PAGE_ROUTES.PROJECTS.DETAIL(id)}>
                          <EyeIcon />
                          <span>View</span>
                        </Link>
                      </DropdownMenuItem>
                      {role === ProjectMemberRole.ADMIN ? (
                        <>
                          <DropdownMenuItem
                            onClick={() => {
                              setProject(item);
                              setOpenEdit(true);
                            }}
                          >
                            <PencilIcon />
                            <span>Edit</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              setShareProjectId(item.id);
                              setOpenInvite(true);
                            }}
                          >
                            <Share2Icon />
                            <span>Share</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => {
                              handleDeleteProject(id);
                            }}
                          >
                            <Trash2 />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </>
                      ) : (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            variant="destructive"
                            onClick={() => {
                              handleLeaveProject(id);
                            }}
                          >
                            <LogOutIcon />
                            <span>Leave</span>
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </SidebarMenuItem>
              );
            })}
            {hasMore && (
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="text-sidebar-foreground/70"
                  onClick={() => {
                    setVisibleCount((count) => count + 3);
                  }}
                >
                  <MoreHorizontal className="text-sidebar-foreground/70" />
                  <span>More</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          </SidebarMenu>
        )}
      </SidebarGroup>

      <ProjectDialog open={open} setOpen={setOpen} />
      <ProjectDialog open={openEdit} setOpen={setOpenEdit} project={project} />

      <InviteMemberDialog
        projectId={shareProjectId}
        open={openInvite}
        setOpen={setOpenInvite}
      />

      <WaitingProjectDialog
        open={openProjectWaiting}
        setOpen={setOpenProjectWaiting}
      />
    </>
  );
};
