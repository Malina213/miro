import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/kit/dialog";
import { TemplatesGallery } from "./templates-gallery";

interface TemplatesModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TemplatesModal({ isOpen, onOpenChange }: TemplatesModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Выберите шаблон</DialogTitle>
          <DialogDescription>
            Выберите шаблон для создания новой доски
          </DialogDescription>
        </DialogHeader>

        <TemplatesGallery className="h-[60vh] pr-4" />
      </DialogContent>
    </Dialog>
  );
}
