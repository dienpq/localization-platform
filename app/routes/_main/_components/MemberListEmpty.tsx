import { Empty, EmptyContent, EmptyTitle } from '~/components/ui';

export const MemberListEmpty = () => {
  return (
    <Empty className="border md:p-6">
      <EmptyContent>
        <EmptyTitle className="text-muted-foreground text-base">
          No members found
        </EmptyTitle>
      </EmptyContent>
    </Empty>
  );
};
