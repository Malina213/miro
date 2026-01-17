import { ScrollArea } from "@/shared/ui/kit/scroll-area";
import { TemplateCard } from "./templates-card";

const TEMPLATES = [
  {
    id: "1",
    name: "Template 1",
    description: "Template 1 description",
    thumbnail: "/",
  },
  {
    id: "2",
    name: "Template 2",
    description: "Template 2 description",
    thumbnail: "/",
  },
  {
    id: "3",
    name: "Template 3",
    description: "Template 3 description",
    thumbnail: "/",
  },
  {
    id: "4",
    name: "Template 4",
    description: "Template 4 description",
    thumbnail: "/",
  },
];

export function TemplatesGallery({ className }: { className?: string }) {
  return (
    <ScrollArea className={className}>
      <ul className="flex gap-4">
        {TEMPLATES.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={() => {}}
          />
        ))}
      </ul>
    </ScrollArea>
  );
}
