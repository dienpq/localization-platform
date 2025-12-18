import { ChevronDownIcon } from 'lucide-react';
import { toast } from 'sonner';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui';
import { Locale } from '~/enum/locale';

interface TranslationDownloadProps {
  projectId: string;
}

export const TranslationDownload = ({
  projectId,
}: TranslationDownloadProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const buildNextIntlMessages = async (projectId: string, locale: Locale) => {
    /* empty */
  };
  const handleDownload = (locale: Locale) => {
    toast.promise(
      async () => {
        // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
        const data = await buildNextIntlMessages(projectId, locale);
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: 'application/json',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `translations-${locale}.json`;
        a.click();
        URL.revokeObjectURL(url);
      },
      {
        loading: 'Preparing download...',
        success: 'Download started!',
        error: 'Failed to download translations.',
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>
          <span>Download</span>
          <ChevronDownIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() => {
            handleDownload(Locale.EN);
          }}
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleDownload(Locale.VI);
          }}
        >
          Vietnamese
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
