import { CreateTranslationGroup } from './CreateTranslationGroup';
import { TranslationDownload } from './TranslationDownload';
import { TranslationGroupList } from './TranslationGroupList';
import { SearchIcon } from 'lucide-react';
import { useState } from 'react';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  Separator,
} from '~/components/ui';
import type { GetProjectResponse } from '~/features/projects';

interface ProjectProps {
  project: GetProjectResponse;
}

export const Project = ({ project }: ProjectProps) => {
  const [inputSearch, setInputSearch] = useState('');

  return (
    <>
      <div className="flex items-center justify-between gap-6">
        <InputGroup className="max-w-sm">
          <InputGroupInput
            value={inputSearch}
            onChange={(e) => {
              setInputSearch(e.target.value);
            }}
            placeholder="Search translation group..."
          />
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>
        <div className="flex items-center gap-4">
          <TranslationDownload projectId={project.id} />
          <CreateTranslationGroup projectId={project.id} />
        </div>
      </div>
      <Separator className="my-4" />
      <TranslationGroupList projectId={project.id} search={inputSearch} />
    </>
  );
};
