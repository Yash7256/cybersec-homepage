import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";

interface Props {
  title: string;
  content: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LegalDialog({ title, content, open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl p-0">
        <span className="sr-only">
          <DialogTitle>{title}</DialogTitle>
        </span>

        <ScrollArea className="max-h-[90vh]">
          <article className="px-6 py-8 sm:px-10 sm:py-10">
            <MarkdownRenderer content={content} />
          </article>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
