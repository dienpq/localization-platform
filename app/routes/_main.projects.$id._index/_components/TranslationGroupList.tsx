'use client';

import { TranslationGroupItem } from './TranslationGroupItem';
import { Skeleton } from '~/components/ui';
import { useGetAllTranslationsByProject } from '~/features/projects';

interface TranslationGroupListProps {
  projectId: string;
  search?: string;
}

export const TranslationGroupList = ({
  projectId,
  search,
}: TranslationGroupListProps) => {
  const { data: translationGroups, isPending } =
    useGetAllTranslationsByProject(projectId);

  return (
    <>
      {isPending ? (
        <Skeleton className="h-40 w-full" />
      ) : (
        <div className="space-y-4">
          {translationGroups?.data
            .filter(({ name }) =>
              name.toLowerCase().includes(search?.toLowerCase() ?? ''),
            )
            .map((translationGroup) => (
              <TranslationGroupItem
                key={translationGroup.id}
                projectId={projectId}
                translationGroup={translationGroup}
              />
            ))}
        </div>
      )}
    </>
  );
};
